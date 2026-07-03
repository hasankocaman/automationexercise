// Yağmur/gökgürültüsü sesleri harici ses dosyası kullanmadan Web Audio API ile
// sentezlenir (CLAUDE.md §8 "dışa bağımlı görsel dosyası ekleme" kuralının ses
// karşılığı — proje bağımsız kalır, ekstra asset indirilmez).
// Tarayıcı autoplay kısıtı nedeniyle AudioContext yalnızca kullanıcı
// etkileşimi (buton tıklaması) içinden oluşturulmalı/resume edilmelidir.

let sharedCtx = null

export function getAudioContext() {
    if (!sharedCtx) {
        const Ctor = window.AudioContext || window.webkitAudioContext
        sharedCtx = new Ctor()
    }
    if (sharedCtx.state === 'suspended') {
        sharedCtx.resume()
    }
    return sharedCtx
}

function createNoiseBuffer(ctx, seconds) {
    const length = Math.floor(ctx.sampleRate * seconds)
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1
    }
    return buffer
}

/**
 * Sürekli çalan, filtrelenmiş beyaz gürültüden oluşan yağmur ambiyansı.
 * Geri dönen `gain` node üzerinden hacim kontrol edilir (fade in/out için).
 */
export function createRainLoop(ctx) {
    const source = ctx.createBufferSource()
    source.buffer = createNoiseBuffer(ctx, 4)
    source.loop = true

    // Bandpass + highpass: sert "tv karıncalanması" hissi yerine yumuşak,
    // yağmur damlası pıtırtısına yakın bir doku.
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = 1100
    bandpass.Q.value = 0.5

    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 500

    const gain = ctx.createGain()
    gain.gain.value = 0

    source.connect(bandpass)
    bandpass.connect(highpass)
    highpass.connect(gain)
    gain.connect(ctx.destination)

    source.start()

    return { source, gain }
}

export function fadeGain(ctx, gainNode, targetValue, durationSeconds = 0.8) {
    const now = ctx.currentTime
    gainNode.gain.cancelScheduledValues(now)
    gainNode.gain.setValueAtTime(gainNode.gain.value, now)
    gainNode.gain.linearRampToValueAtTime(targetValue, now + durationSeconds)
}

export function stopRainLoop({ source, gain }, ctx) {
    fadeGain(ctx, gain, 0, 0.5)
    setTimeout(() => {
        try { source.stop() } catch { /* zaten durmuş olabilir */ }
    }, 550)
}

/**
 * Tek seferlik gök gürültüsü sesi: kısa gürültü patlaması + zamanla düşen
 * lowpass filtre frekansı = uzaktan gelen bir gümbürtü hissi.
 */
export function playThunder(ctx, masterVolume = 0.4) {
    const duration = 1.6 + Math.random() * 0.9
    const source = ctx.createBufferSource()
    source.buffer = createNoiseBuffer(ctx, duration)

    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(1000, ctx.currentTime)
    lowpass.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + duration * 0.85)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(masterVolume, ctx.currentTime + 0.06)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

    source.connect(lowpass)
    lowpass.connect(gain)
    gain.connect(ctx.destination)

    source.start()
    source.stop(ctx.currentTime + duration + 0.1)
}

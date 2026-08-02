# Draft — dev.to / Medium — SQL JOINs for Testers

**Working title:** SQL JOINs, Explained the Way a Tester Actually Needs Them

---

Most SQL tutorials teach JOINs as a database design topic: normalize your
schema, split data across tables, then JOIN it back together for reporting.
That's true, but it's not why a QA engineer needs to know this.

A tester needs JOINs because the thing you're actually testing — "did this
API request correctly create an order?" — usually lives in more than one
table. The order header is in one table, its line items are in another, the
customer record is in a third. If you can only query one table at a time,
you can't actually verify the request did what it claimed.

## The one JOIN you'll use constantly: INNER JOIN

```sql
SELECT orders.id, orders.status, customers.email
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
WHERE orders.id = 4821;
```

This answers: "for order 4821, what's the status, and which customer placed
it?" — one query, instead of two round trips and matching IDs by hand. This
is the JOIN you'll write in almost every backend-validation test.

## The one that actually finds bugs: LEFT JOIN

```sql
SELECT orders.id, order_items.id AS item_id
FROM orders
LEFT JOIN order_items ON order_items.order_id = orders.id
WHERE orders.id = 4821;
```

`INNER JOIN` only returns rows where both sides match. `LEFT JOIN` keeps
every row from the left table regardless of whether a match exists — and
that's exactly what makes it useful for testing. If `order_items.id` comes
back `NULL` for an order that should have line items, you've just found a
real defect: the order was created, but the items never got written. An
`INNER JOIN` would have silently hidden that order from your results
entirely, because it only shows matches. For test data validation, "missing"
is a result you need to see, not one you want filtered out.

## Why this matters more than knowing the syntax

The actual skill isn't memorizing JOIN syntax — it's knowing which JOIN
answers the question you're actually asking. "Does a match exist?" is an
`INNER JOIN` question. "Does every row on this side have a match, and where
doesn't it?" is a `LEFT JOIN` question. Most real backend bugs — an order
created without items, a user record without a profile, a payment without a
linked invoice — surface as `NULL`s on the right side of a `LEFT JOIN`, not as
missing rows from an `INNER JOIN` you never thought to run.

## A useful habit

When validating that an API call had the expected side effect on the
database, default to `LEFT JOIN` first — it tells you both "the row exists"
and "the related row is missing," in one query. Switch to `INNER JOIN` once
you're specifically confirming that a relationship exists and don't care
about the orphan case.

---

*The full walkthrough — including `GROUP BY`+`HAVING` for aggregate
validation, subqueries, and a browser-based SQL sandbox you can run these
exact queries in — is part of a free SQL-for-QA course at LearnQA.dev.*

Canonical / full version: `https://learnqa.dev/en/sql/sql-joins`

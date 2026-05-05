# Form-First Full-Surface V1
#learning

## Insight
When a manuscript-first writing app has many adjacent product surfaces, a form-first CRUD pattern is the fastest path from placeholder UI to a truly usable local-first v1.

## Why It Matters
Trying to jump straight to highly visual planning boards, maps, or graph views can leave core product promises unfulfilled for too long. A consistent list-and-editor pattern across story-bible and planning entities makes every named surface functional sooner and keeps persistence behavior easier to reason about.

## Reusable Practice
- Ship every required surface with working create, edit, and delete flows before pursuing advanced visualizations.
- Use one reusable CRUD workspace pattern across adjacent surfaces to reduce implementation drift.
- Keep manuscript linking in the inspector so authors can connect scene context without losing writing focus.
- Add first-class navigation entries for any domain that is explicitly part of product scope instead of hiding it inside another surface.

## Related Areas
- [[ARCHITECTURE]]
- [[manuscript-first-inspector-layout]]
- [[..\planning\project-aggregate-manuscript-crud]]

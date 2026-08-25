---
layout: page
title: projects
description: Public systems, challenges, and research structures with something concrete behind them.
permalink: /projects/
wide: true
---

{% assign ordered_projects = site.projects | sort: 'order' %}
<div class="system-ledger">
{% for project in ordered_projects %}
  <article class="system-record">
    <a href="{{ project.url | relative_url }}">
      <header>
        <span>system / 0{{ forloop.index }}</span>
        <span>{{ project.status }}</span>
      </header>
      <div>
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
      </div>
      <footer>
        <span>open record</span>
        <span aria-hidden="true">&#8599;</span>
      </footer>
    </a>
  </article>
{% endfor %}
</div>

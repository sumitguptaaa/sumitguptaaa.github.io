---
layout: page
title: projects
description: Public work with something concrete behind it.
permalink: /projects/
---

{% assign ordered_projects = site.projects | sort: 'order' %}
<div class="project-list project-index">
{% for project in ordered_projects %}
  <article class="project-summary">
    <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
    <p>{{ project.description }}</p>
    <p class="project-links"><span>{{ project.status }}</span> · <a href="{{ project.repository }}">github</a></p>
  </article>
{% endfor %}
</div>

---
layout: page
title: tags
description: Writing grouped by subject.
permalink: /writing/tags/
---

{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}
<section class="tag-archive" id="{{ tag[0] | slugify }}">
  <h2>{{ tag[0] }}</h2>
  <ol class="dated-list">
    {% for post in tag[1] %}
      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%Y-%m-%d' }}</time>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ol>
</section>
{% endfor %}

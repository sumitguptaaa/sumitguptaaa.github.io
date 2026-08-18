---
layout: page
title: writing
description: Technical notes and research, arranged chronologically.
permalink: /writing/
---

{% assign posts_by_year = site.posts | group_by_exp: 'post', "post.date | date: '%Y'" %}
{% for year in posts_by_year %}
<section class="archive-year" aria-labelledby="year-{{ year.name }}">
  <h2 id="year-{{ year.name }}">{{ year.name }}</h2>
  <ol class="dated-list">
    {% for post in year.items %}
      <li>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b %d' }}</time>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ol>
</section>
{% endfor %}

<p class="archive-footnote"><a href="{{ '/writing/tags/' | relative_url }}">browse by tag</a> · <a href="{{ '/feed.xml' | relative_url }}">rss</a></p>

---
layout: page
title: writing
description: Security investigations built from plain-language ideas and machine evidence.
permalink: /writing/
wide: true
---

{% assign posts_by_year = site.posts | group_by_exp: 'post', "post.date | date: '%Y'" %}
{% for year in posts_by_year %}
<section class="archive-year" aria-labelledby="year-{{ year.name }}">
  <header class="folio-rule">
    <h2 id="year-{{ year.name }}">{{ year.name }}</h2>
    <span>{{ year.items | size }} record{% if year.items.size != 1 %}s{% endif %}</span>
  </header>
  <ol class="research-ledger">
    {% for post in year.items %}
      <li>
        <a href="{{ post.url | relative_url }}">
          <span class="ledger-id">{% if post.autopsy %}A-{{ post.autopsy }}{% else %}N-0{{ forloop.index }}{% endif %}</span>
          <span class="ledger-title">{{ post.title }}</span>
          <span class="ledger-topic">{% if post.tags %}{{ post.tags | first }}{% else %}research{% endif %}</span>
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: '%b %d' }}</time>
          <span class="ledger-arrow" aria-hidden="true">&#8599;</span>
        </a>
      </li>
    {% endfor %}
  </ol>
</section>
{% endfor %}

<p class="archive-footnote"><a href="{{ '/writing/tags/' | relative_url }}">browse by tag</a> <span>/</span> <a href="{{ '/feed.xml' | relative_url }}">rss</a></p>

const root = `name: {{ gitlabCiName.value }}
{% if stages > 0 %}
stages:
{% for job in jobCi %}
{% for attribute in getAttributes(job) %}
{% if attribute.name === 'stage' %}
    - {{ attribute.value }}
{% endif %}
{% endfor %}
{% endfor %}
{% endif %}
{% for attribute in getAttributes(gitlabCi) %}
{% if attribute.type === 'Object' %}
variables:
{% for variableattribute in attribute.value %}
    {{ variableattribute.name }}: {{ variableattribute.value }}
{% endfor %}
{% endif %}
{% if attribute.name === 'tags' %}
tags:
{% for tagsattribute in attribute.value %}
    - {{ tagsattribute }}
{% endfor %}
{% endif %}
{% endfor %}
{% if service.length > 0 %}
services:
{% for serv in service %}
{% for attribute in getAttributes(serv) %}
  {% if attribute.name === 'name' %}
  - name: {{attribute.value }}
  {% else %}
    {{attribute.name}}: {{attribute.value }}
  {% endif %}
{% endfor %}
{% endfor %}
{% endif %}
{% if jobCi.length > 0 %}
{% for job in jobCi %}
{{job.id}}:
{% for attribute in getAttributes(job) %}
    {% if attribute.name === 'tags' %}
    tags:
    {% for tag in attribute.value %}
      - {{ tag }}   
    {% endfor %}
    {% endif %}
    {% if attribute.name === 'beforescript' %}
    before_script: 
    {% for before_script in attribute.value %}
      - {{ before_script }}
    {% endfor %}
    {% endif %}
    {% if attribute.name === 'script' %} 
    script: 
    {% for script in attribute.value %}
      - {{ script }}
    {% endfor %}
    {% endif %}
    {% if attribute.name === 'afterscript' %} 
    after_script: 
    {% for after_script in attribute.value %}
      - {{ after_script }}
    {% endfor %}
    {% endif %}
    {% if attribute.type !== 'Array' %}
    {{attribute.name}}: {{attribute.value }}
    {% endif %}
{% endfor %}
{% endfor %}
{% endif %}`;

export default {
  root,
};

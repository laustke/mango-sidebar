## What's next?

1. Static website

For a small, presentation-style website with maybe a dozen pages or so, you can essentially repeat the same approach we used when we added two more pages.

When we create a new HTML page, we need to set the 'active' class on the menu item that opens this page. If this page is on the second level, we also need to expand the first-level menu that contains the active menu item. We do this by setting aria-expanded="true" on the dropdown button and aria-hidden="false" on the submenu.

2. Dynamic website with server-side html rendering

Basically, you repeat the same process on the server side using the templating language of your choice. Most likely, you would have a data structure that represents the menu. 

```
{% if current_url == 'marketing.html' %} class="active" {% endif %}
```

```
aria-expanded = "{{ is_child(current_url, 'Services') }}
```

And the same thing for submenu aria-hidden attribute. 

I think to explore this approach further, the next thing I will do is create a Flask example (I'm a Python programmer, so choosing Flask seems natural). It will be called 'mango-sidebar-flask-edition.'

3. Pure javascript client-side solution

I haven't found a way to do it that I'm happy with.

We can use JavaScript on the client side to set the 'active' class and aria attributes. However, the issue is that the appearance of the sidebar relies on its internal structure. For instance, whether a submenu should be open depends on whether it contains a link to the current URL. This decision needs to be made before the page is displayed to avoid delays or flickering.
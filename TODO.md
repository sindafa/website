- create product page template
  - head
  - body
  
- generate products pages
  READ products.json
  FOREACH product in products.json:
    write_to_file(`product.html`, product)


  
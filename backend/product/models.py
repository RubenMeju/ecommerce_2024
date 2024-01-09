import uuid
from django.db import models
from django.utils.text import slugify
from category.models import Category
from brand.models import Brand


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', null=True, blank=True)

    # Nuevo campo para el slug
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        # Generar el slug automáticamente al guardar el producto
        if not self.slug:
            self.slug = slugify(self.name)
            # Asegurarse de que el slug sea único
            while Product.objects.filter(slug=self.slug).exists():
                self.slug = slugify(self.name) + '-' + str(uuid.uuid4())[:8]

        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

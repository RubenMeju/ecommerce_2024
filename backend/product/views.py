from rest_framework import viewsets
from product.models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filterset_fields = ['slug']
   # permission_classes = [IsAccountAdminOrReadOnly]

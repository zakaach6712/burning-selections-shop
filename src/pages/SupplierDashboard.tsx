import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Package, Edit, Trash2, Upload, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_count: number;
  category_id: string;
  images: string[];
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
}

const SupplierDashboard = () => {
  const { user, isSupplier, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_count: '',
    category_id: '',
    image_url: '',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isSupplier)) {
      navigate('/auth');
    }
  }, [user, isSupplier, authLoading, navigate]);

  useEffect(() => {
    if (user && isSupplier) {
      fetchProducts();
      fetchCategories();
    }
  }, [user, isSupplier]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('supplier_id', user?.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    }
  };

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Resize to max 1200px on longest side while maintaining aspect ratio
          const maxSize = 1200;
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              } else {
                resolve(file);
              }
            },
            'image/jpeg',
            0.9
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Automatically resize image
      const resizedImage = await resizeImage(file);
      setSelectedImage(resizedImage);
      setImagePreview(URL.createObjectURL(resizedImage));
      
      toast({
        title: 'Image ready',
        description: 'Image automatically optimized',
      });
    } catch (error) {
      // If resize fails, use original
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setFormData({ ...formData, image_url: '' });
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage || !user) return formData.image_url || null;

    setUploading(true);
    try {
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, selectedImage, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUploading(true);
      
      // Upload new image if selected
      let imageUrl = formData.image_url;
      if (selectedImage) {
        const uploadedUrl = await uploadImage();
        if (!uploadedUrl) {
          setUploading(false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock_count: parseInt(formData.stock_count),
        category_id: formData.category_id || null,
        images: imageUrl ? [imageUrl] : [],
        supplier_id: user?.id,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        is_active: true,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Product added successfully',
        });
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        stock_count: '',
        category_id: '',
        image_url: '',
      });
      setSelectedImage(null);
      setImagePreview(null);
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stock_count: product.stock_count.toString(),
      category_id: product.category_id || '',
      image_url: product.images[0] || '',
    });
    setSelectedImage(null);
    setImagePreview(product.images[0] || null);
    setShowForm(true);
    
    // Scroll to form smoothly
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      // Soft delete: set is_active to false instead of deleting
      // This preserves order history and prevents foreign key constraint violations
      const { error } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-display text-4xl font-bold">Restaurant Admin Panel</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? 'Cancel' : 'Add Menu Item'}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProduct ? 'Edit Menu Item' : 'Add New Menu Item'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Count *</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock_count}
                      onChange={(e) => setFormData({ ...formData, stock_count: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image">Product Image</Label>
                  <div className="mt-2">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <Upload className="h-12 w-12 mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload image
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          Any size - automatically optimized
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageSelect}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? 'Uploading...' : editingProduct ? 'Update Menu Item' : 'Add Menu Item'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
              <h2 className="font-display text-2xl font-bold mb-2">No Menu Items Yet</h2>
              <p className="text-muted-foreground">Start by adding your first menu item</p>
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-display text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.stock_count}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SupplierDashboard;
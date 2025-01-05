import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AdminProductForm({ product, onSave }) {
  const [formData, setFormData] = useState(product || {
    name: '',
    description: '',
    price: 0,
    image: '',
    category: 'jersey',
    featured: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (product) {
        await supabase
          .from('products')
          .update(formData)
          .eq('id', product.id)
      } else {
        await supabase
          .from('products')
          .insert([formData])
      }
      onSave()
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Product Name"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
        placeholder="Price"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        placeholder="Image URL"
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="jersey">Jersey</option>
        <option value="cleats">Cleats</option>
        <option value="accessories">Accessories</option>
      </select>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          id="featured"
        />
        <label htmlFor="featured">Featured Product</label>
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {product ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  )
}

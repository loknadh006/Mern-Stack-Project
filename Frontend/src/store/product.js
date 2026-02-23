import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],

  /* 🔄 loading states */
  loading: false,        // for fetching products
  actionLoading: false,  // for create / update / delete

  setProducts: (products) => set({ products }),

  /* 🔹 CREATE PRODUCT */
  createproduct: async (newproduct) => {
    if (!newproduct.name || !newproduct.image || !newproduct.price) {
      return { success: false, message: 'please fill all fields' };
    }

    set({ actionLoading: true });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newproduct),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Server error');
      }

      const data = await res.json();

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: 'product created successfully' };
    } catch (error) {
      console.error('Create product failed:', error.message);
      return { success: false, message: error.message };
    } finally {
      set({ actionLoading: false });
    }
  },

  /* 🔹 FETCH PRODUCTS */
  fetchProducts: async () => {
    set({ loading: true });

    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error('Fetch products failed:', error.message);
    } finally {
      set({ loading: false });
    }
  },

  /* 🔹 DELETE PRODUCT */
  deleteProduct: async (pid) => {
    set({ actionLoading: true });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:5000/api/products/${pid}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.filter(
          (product) => product._id !== pid
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      set({ actionLoading: false });
    }
  },

  /* 🔹 UPDATE PRODUCT */
  updateProduct: async (pid, updatedProduct) => {
    set({ actionLoading: true });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((p) =>
          p._id === pid ? data.data : p
        ),
      }));

      return { success: true, message: 'Product updated successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      set({ actionLoading: false });
    }
  },
}));

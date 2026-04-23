import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('--- Supabase Debug ---')
console.log('URL:', supabaseUrl)
console.log('Key Length:', supabaseAnonKey?.length)
console.log('Key starts with:', supabaseAnonKey?.substring(0, 10))
console.log('----------------------')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @returns {Promise<{url: string, error: string|null}>}
 */
export async function uploadMenuImage(file) {
  // Validation
  if (!file) {
    return { url: null, error: 'No file selected' }
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

  if (file.size > MAX_FILE_SIZE) {
    return { url: null, error: 'File size must be less than 5MB' }
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { url: null, error: 'Only JPEG, PNG, and WebP images are allowed' }
  }

  try {
    // Generate unique filename
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${random}.${extension}`

    // Upload to storage
    const { data, error: uploadError } = await supabase.storage
      .from('menu-items')
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      return { url: null, error: uploadError.message }
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('menu-items')
      .getPublicUrl(filename)

    return { url: publicUrlData.publicUrl, error: null }
  } catch (err) {
    return { url: null, error: err.message || 'Upload failed' }
  }
}

/**
 * Delete an image from Supabase Storage
 * @param {string} imagePath - The full URL or path of the image
 * @returns {Promise<{error: string|null}>}
 */
export async function deleteMenuImage(imagePath) {
  if (!imagePath) {
    return { error: null }
  }

  try {
    // Extract filename from URL if full URL is provided
    let filename = imagePath
    if (imagePath.includes('/')) {
      filename = imagePath.split('/').pop()
    }

    const { error } = await supabase.storage
      .from('menu-items')
      .remove([filename])

    if (error) {
      // Log error but don't fail - cleanup is optional
      console.warn('Failed to delete image from storage:', error)
    }

    return { error: null }
  } catch (err) {
    console.warn('Error during image deletion:', err)
    return { error: null }
  }
}

/**
 * Fetch all categories
 * @returns {Promise<{data: Array, error: string|null}>}
 */
export async function fetchCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order', { ascending: true })
    
    return { data: data || [], error: error?.message || null }
  } catch (err) {
    return { data: [], error: err.message }
  }
}

/**
 * Add new category
 * @param {string} name_en - English name
 * @param {string} name_ar - Arabic name
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function addCategory(name_en, name_ar) {
  if (!name_en || !name_ar) {
    return { data: null, error: 'Both English and Arabic names are required' }
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([{
        name_en,
        name_ar,
        order: Date.now() // Use timestamp for ordering new items
      }])
      .select()
    
    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data?.[0] || null, error: null }
  } catch (err) {
    return { data: null, error: err.message }
  }
}

/**
 * Update category
 * @param {string} id - Category ID
 * @param {string} name_en - English name
 * @param {string} name_ar - Arabic name
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function updateCategory(id, name_en, name_ar) {
  if (!id || !name_en || !name_ar) {
    return { data: null, error: 'ID and both names are required' }
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .update({ name_en, name_ar })
      .eq('id', id)
      .select()
    
    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data?.[0] || null, error: null }
  } catch (err) {
    return { data: null, error: err.message }
  }
}

/**
 * Delete category (check if items exist first)
 * @param {string} id - Category ID
 * @returns {Promise<{success: boolean, itemCount: number, error: string|null}>}
 */
export async function deleteCategory(id) {
  if (!id) {
    return { success: false, itemCount: 0, error: 'Category ID is required' }
  }

  try {
    // Check if any items use this category
    const { data: items, error: checkError } = await supabase
      .from('menu_items')
      .select('id')
      .eq('category_id', id)
    
    if (checkError) {
      return { success: false, itemCount: 0, error: checkError.message }
    }

    if (items && items.length > 0) {
      return { 
        success: false, 
        itemCount: items.length, 
        error: `Cannot delete category: ${items.length} item(s) using this category` 
      }
    }

    // Delete the category
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
    
    if (error) {
      return { success: false, itemCount: 0, error: error.message }
    }

    return { success: true, itemCount: 0, error: null }
  } catch (err) {
    return { success: false, itemCount: 0, error: err.message }
  }
}

/**
 * Helper: Format portion display text
 * @param {Object} item - Menu item with portion_type, weight_value, weight_unit, size
 * @returns {string} Formatted portion string (e.g., "1 kg", "Size: M")
 */
export function formatPortion(item) {
  if (!item.portion_type) return ''
  
  if (item.portion_type === 'weight') {
    const value = item.weight_value
    const unit = item.weight_unit === 'kg' ? 'kg' : 'g'
    return `${value} ${unit}`
  }
  
  if (item.portion_type === 'size') {
    const sizeLabel = item.size?.toUpperCase()
    return `Size: ${sizeLabel}`
  }
  
  return ''
}

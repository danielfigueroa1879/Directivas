#!/usr/bin/env python3
"""
Script para optimizar imágenes de la plataforma OS10 Coquimbo
Convierte imágenes a WebP y las optimiza para web
"""

import os
from PIL import Image
import sys

def optimize_image(input_path, output_path, quality=85, max_width=1920):
    """
    Optimiza una imagen y la convierte a WebP
    
    Args:
        input_path: Ruta de la imagen original
        output_path: Ruta donde guardar la imagen optimizada
        quality: Calidad de compresión (0-100)
        max_width: Ancho máximo de la imagen
    """
    try:
        with Image.open(input_path) as img:
            # Convertir a RGB si es necesario (para PNG con transparencia)
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            
            # Redimensionar si es muy grande
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Guardar como WebP
            img.save(output_path, 'WebP', quality=quality, method=6)
            
            # Calcular reducción de tamaño
            original_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            reduction = ((original_size - new_size) / original_size) * 100
            
            print(f"✓ {os.path.basename(input_path)}: {original_size//1024}KB → {new_size//1024}KB (-{reduction:.1f}%)")
            return True
            
    except Exception as e:
        print(f"✗ Error procesando {input_path}: {e}")
        return False

def main():
    images_dir = "assets/images"
    
    if not os.path.exists(images_dir):
        print(f"Error: No se encontró el directorio {images_dir}")
        sys.exit(1)
    
    print("🖼️  Optimizando imágenes...\n")
    
    # Extensiones de imagen a procesar
    extensions = ('.jpg', '.jpeg', '.png')
    
    total_original = 0
    total_optimized = 0
    count = 0
    
    for filename in os.listdir(images_dir):
        if filename.lower().endswith(extensions):
            input_path = os.path.join(images_dir, filename)
            
            # Crear nombre de archivo WebP
            name_without_ext = os.path.splitext(filename)[0]
            output_filename = f"{name_without_ext}.webp"
            output_path = os.path.join(images_dir, output_filename)
            
            # Saltar si ya existe la versión WebP
            if os.path.exists(output_path):
                continue
            
            original_size = os.path.getsize(input_path)
            
            if optimize_image(input_path, output_path):
                new_size = os.path.getsize(output_path)
                total_original += original_size
                total_optimized += new_size
                count += 1
    
    if count > 0:
        total_reduction = ((total_original - total_optimized) / total_original) * 100
        print(f"\n✅ Optimización completada:")
        print(f"   - Imágenes procesadas: {count}")
        print(f"   - Tamaño original: {total_original//1024//1024}MB")
        print(f"   - Tamaño optimizado: {total_optimized//1024//1024}MB")
        print(f"   - Reducción total: {total_reduction:.1f}%")
    else:
        print("\n✓ Todas las imágenes ya están optimizadas")

if __name__ == "__main__":
    main()

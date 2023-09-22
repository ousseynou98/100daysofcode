<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductCategory;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::select('products.*', 'product_categories.name as category_name')
        ->join('product_categories', 'products.category_id', '=', 'product_categories.id')
        ->get();    
        return response()->json($products);
    }

    public function category()
    {
        $categories = ProductCategory::all();    
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        
        $product = new Product;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->category_id = $request->category;
        $product->save();
      
        return response()->json($product);
    }

    public function show($id)
    {
        $product = Product::select('products.*', 'product_categories.name as category_name')
        ->join('product_categories', 'products.category_id', '=', 'product_categories.id')
        ->where('products.id',$id)
        ->get(); 
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $product->description = $request->description;
        $product->price = $request->price;
        $product->category_id = $request->category;
        $product->update();
      
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'produit supprimé avec succès ']);
    }


}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CampagneController;
use App\Http\Controllers\PermissionsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Public routes 
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);



Route::group(['middleware'=>['auth:sanctum']],function(){
    
    Route::get('/check-authentication', function () {
        $user = auth()->user();
        if ($user) {
            return response()->json(['message' => 'User is authenticated', 'user' => $user], 200);
        } else {
            return response()->json(['message' => 'User is not authenticated'], 401);
        }
    });
    
    Route::post('/logout',[AuthController::class,'logout']);

    //Permissions 
    Route::get('/permissions',[PermissionsController::class ,'index']);

    //User
    Route::get('/user',[UserController::class ,'index']);
    Route::post('/user/store',[UserController::class ,'store']);
    Route::get('/user/{id}', [UserController::class, 'show']); 
    Route::put('/user/update/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);

    //Contacts
    Route::get('/contacts/{id}',[ContactController::class ,'index']);
    Route::post('/contact/store',[ContactController::class ,'store']);
    Route::get('/contact/{id}', [ContactController::class, 'show']); 
    Route::put('/contact/update/{id}', [ContactController::class, 'update']);
    Route::delete('/contact/{id}', [ContactController::class, 'destroy']);
    Route::post('/contact/upload',[ContactController::class ,'upload']);

    //Clients
    Route::get('/clients',[ClientController::class ,'index']);
    Route::post('/client/store',[ClientController::class ,'store']);
    Route::get('/client/{id}', [ClientController::class, 'show']); 
    Route::put('/client/update/{id}', [ClientController::class, 'update']);
    Route::delete('/client/{id}', [ClientController::class, 'destroy']);
    Route::post('/client/upload',[ClientController::class ,'upload']);
    Route::delete('/client/{id}', [ClientController::class, 'destroy']);

    //Projects
    Route::get('/projects',[ProjectController::class ,'index']);
    Route::post('/project/store',[ProjectController::class ,'store']);
    Route::get('/project/{id}', [ProjectController::class, 'show']); 
    Route::put('/project/update/{id}', [ProjectController::class, 'update']);
    Route::delete('/project/{id}', [ProjectController::class, 'destroy']);

    //tasks
    Route::get('/tasks',[TaskController::class ,'index']);
    Route::post('/tasks/store',[TaskController::class ,'store']);
    Route::put('tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);

    //products
    Route::get('/products',[ProductController::class ,'index']);
    Route::get('/product/category',[ProductController::class ,'category']);
    Route::post('/product/store',[ProductController::class ,'store']);
    Route::get('/product/{id}', [ProductController::class, 'show']); 
    Route::put('/product/update/{id}', [ProductController::class, 'update']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);

    //expenses
    Route::get('/expenses',[ExpenseController::class ,'index']);
    Route::get('/expense/category',[ExpenseController::class ,'category']);
    Route::post('/expense/store',[ExpenseController::class ,'store']);
    Route::get('/expense/{id}', [ExpenseController::class, 'show']);
    Route::put('/expense/update/{id}', [ExpenseController::class, 'update']);
    Route::delete('/expense/{id}', [ExpenseController::class, 'destroy']);
    Route::post('/expense/upload',[ExpenseController::class ,'upload']);
    // // envoie sms
    // Route::post('/sms/send',[SmsController::class ,'sendSms']);

    // // Post
    // Route::get('/posts', [PostController::class, 'index']);
    // Route::post('/posts', [PostController::class, 'store']);
    // Route::get('/posts/{id}', [PostController::class, 'show']);
    // Route::put('/posts/{id}', [PostController::class, 'update']);
    // Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    // // Comment
    // Route::get('/posts/{id}/comments', [CommentController::class, 'index']);
    // Route::post('/posts/{id}/comments', [CommentController::class, 'store']);
    // Route::put('/comments/{id}', [CommentController::class, 'update']); 
    // Route::delete('/comments/{id}', [CommentController::class, 'destroy']); 

    // // Like
    // Route::post('/posts/{id}/likes', [LikeController::class, 'likeOrUnlike']); 

    // //Campagne
    // Route::get('/campagnes',[CampagneController::class ,'index']);
    // Route::post('/campagne/store',[CampagneController::class ,'store']);
    // Route::get('/campagne/{id}', [CampagneController::class, 'show']); 
    // Route::put('/campagne/update/{id}', [CampagneController::class, 'update']);
    // Route::delete('/campagne/{id}', [CampagneController::class, 'destroy']);
    
});



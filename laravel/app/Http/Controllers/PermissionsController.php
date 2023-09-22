<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class PermissionsController extends Controller
{
    public function index(Request $request)
    {

        $roles = Role::where('deleted_at', '=', null)->get();

        return response()->json($roles);
    }
}

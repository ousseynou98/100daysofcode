<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function index()
    {

        $projects = DB::table('projects')
        ->select('projects.*', DB::raw('GROUP_CONCAT(users.name) as user_name'), DB::raw('GROUP_CONCAT(users.image) as user_image'), 'clients.name as client_name')
        ->leftJoin('users', function ($join) {
            $join->on('users.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(projects.team, '$[0]'))"))
                ->orWhere('users.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(projects.team, '$[1]'))"));
        })
        ->leftJoin('clients', 'clients.id', '=', 'projects.client')
        ->groupBy('projects.id', 'projects.title', 'projects.client', 'projects.due_date', 'projects.team', 'projects.status', 'projects.created_at', 'clients.name')
        ->get();

        
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        //var_dump($request);
        $project = new Project;
        $project->title = $request->title;
        $project->client = $request->client;
        $project->due_date = $request->dueDate;
        $project->team = '['.$request->team.']';
        $project->status = $request->statusP;
        $project->save();

        return response()->json($project);
    }

    public function show($id)
    {
        // $project = Project::findOrFail($id);
        $project = Project::select(
            'projects.*',
            DB::raw('GROUP_CONCAT(users.name) as user_name'),
            DB::raw('GROUP_CONCAT(users.image) as user_image'),
            'clients.name as client_name'
        )
            ->leftJoin('users', function ($join) use ($id) {
                $join->on('users.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(projects.team, '$[0]'))"))
                    ->orWhere('users.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(projects.team, '$[1]'))"));
            })
            ->leftJoin('clients', 'clients.id', '=', 'projects.client')
            ->where('projects.id', '=', $id)
            ->groupBy(
                'projects.id',
                'projects.title',
                'projects.client',
                'projects.due_date',
                'projects.team',
                'projects.status',
                'projects.created_at',
                'clients.name'
            )
            ->firstOrFail();
        

        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        // if (!$project) {
        //     return response()->json(['message' => 'Projet introuvable'], 404);
        // }

        $project->title = $request->title;
        $project->client = $request->client;
        $project->due_date = $request->dueDate;
        $project->team = $request->team;
        $project->status = $request->statusP;
        $project->update();

        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'projet supprimé avec succès ']);
    }


}

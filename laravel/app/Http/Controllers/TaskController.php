<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{

    public function store(Request $request)
    {
        // Déterminez le statut de la nouvelle tâche
        $status = $request->statusP;

        // Récupérez la position maximale pour ce statut
        $maxPosition = Task::where('status', $status)->max('position');

        // Calculer la nouvelle position
        $newPosition = $maxPosition + 1;

        // Créez et enregistrez la nouvelle tâche avec la nouvelle position
       // dump($request->all()); 
        $task = new Task;
        $task->title = $request->title;
        $task->due_date = $request->due_date;
        $task->project = $request->project;
        $task->worker = '['.$request->team.']';
        $task->status = $status;
        $task->position = $newPosition; 
        $task->description =$request->description; 
        // Enregistrez la requête SQL dans une variable
    
        $task->save();
      
        return response()->json($task);
    }

    public function index()
    {

        // $tasks = DB::table('tasks')
        // ->select('tasks.*', DB::raw('GROUP_CONCAT(users.name) as user_name'), DB::raw('GROUP_CONCAT(users.image) as user_image'))
        // ->leftJoin('users', function ($join) {
        //     $join->on('users.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(tasks.worker, '$[0]'))"))
        //         ->orWhere('users.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(tasks.worker, '$[1]'))"));
        // })
        // ->groupBy('tasks.id', 'tasks.title'/*, 'projects.client', 'projects.due_date'*/, 'tasks.worker', 'tasks.status', 'tasks.created_at')
        // ->get();

        $tasks = DB::table('tasks')
        ->select(
            'tasks.*',
            DB::raw('GROUP_CONCAT(users.name) as user_name'),
            DB::raw('GROUP_CONCAT(users.image) as user_image'),
            'projects.title as project_title', // Ajout du nom du projet
            'clients.name as client_name'     // Ajout du nom du client
        )
        ->leftJoin('users', function ($join) {
            $join->on('users.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(tasks.worker, '$[0]'))"))
                ->orWhere('users.id', '=', DB::raw("JSON_UNQUOTE(JSON_EXTRACT(tasks.worker, '$[1]'))"));
        })
        ->leftJoin('projects', 'tasks.project', '=', 'projects.id') // Jointure avec la table projects
        ->leftJoin('clients', 'projects.client', '=', 'clients.id')  // Jointure avec la table clients
        ->groupBy(
            'tasks.id',
            'tasks.title',
            'tasks.worker',
            'tasks.status',
            'tasks.created_at',
            'project_title',  // Nom du projet
            'client_name'    // Nom du client
        )
        ->get();


        
        return response()->json($tasks);
    }

    public function update(Request $request, Task $task)
    {
        // Validez les données (facultatif)
        $request->validate([
            'status' => 'required|in:Nouvelle,En cours,Terminée',
            'position' => 'required|integer',
        ]);

        // Mettez à jour la tâche avec les données du formulaire
        $task->update([
            'status' => $request->input('status'),
            'position' => $request->input('position'),
        ]);

        // Répondez avec un message de succès ou les données mises à jour (facultatif)
        return response()->json([
            'message' => 'Tâche mise à jour avec succès.',
            'task' => $task, // Vous pouvez retourner les données mises à jour si nécessaire
        ]);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'tache supprimée avec succès ']);
    }

}

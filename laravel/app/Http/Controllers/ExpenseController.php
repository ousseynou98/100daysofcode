<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Expense;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ExpenseCategory;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ExpenseController extends Controller
{
    public function store(Request $request)
    {
        
        $expense = new Expense;
        $expense->description = $request->description;
        $expense->amount = $request->amount;
        $expense->expense_category = $request->category;
        $expense->expense_date = $request->expenseDate;
        $expense->project = $request->project;
        $expense->team_member = $request->team;
        $expense->billable = $request->billable;
        if (!empty($request->file('file'))) {
            $image = $request->file('file');
            $originalName = $image->getClientOriginalName();
            $originalNameWithoutSpaces = str_replace(' ', '_', $originalName);
            $fileName = time() . '_' . $originalNameWithoutSpaces;
            $image->storeAs('public/images/receipt', $fileName);
            $expense->receipt = $fileName;
        }
        
        $expense->save();
        //dd($request->all());
        return response()->json($expense);
    }

    public function index()
    {

        $expenses = DB::table('expenses')
        ->select('expenses.*', 'projects.title as project_name','users.image','users.name as user_name', 'expense_categories.name as expense_category_name',)
        ->leftJoin('projects', 'projects.id', '=', 'expenses.project')
        ->leftJoin('users', 'users.id', '=', 'expenses.team_member')
        ->leftJoin('expense_categories', 'expense_categories.id', '=', 'expenses.expense_category')
        ->groupBy('expenses.id')
        ->get();

        
        return response()->json($expenses);
    }

    public function show($id)
    {

        $expenses = DB::table('expenses')
        ->select('expenses.*', 'projects.title as project_name','users.image','users.name as user_name', 'expense_categories.name as expense_category_name',)
        ->leftJoin('projects', 'projects.id', '=', 'expenses.project')
        ->leftJoin('users', 'users.id', '=', 'expenses.team_member')
        ->leftJoin('expense_categories', 'expense_categories.id', '=', 'expenses.expense_category')
        ->where('expenses.id',$id)
        ->groupBy('expenses.id')
        ->get();

        
        return response()->json($expenses);
    }

    public function category()
    {
        $categories = ExpenseCategory::all();    
        return response()->json($categories);
    }

    public function update(Request $request , $id)
    {
        
        $expense = Expense::find($id);
        $expense->description = $request->description;
        $expense->amount = $request->amount;
        $expense->expense_category = $request->category;
        $expense->expense_date = $request->expenseDate;
        $expense->project = $request->project;
        $expense->team_member = $request->team;
        $expense->billable = $request->billable;
        if (!empty($request->file('file'))) {
            $image = $request->file('file');
            $originalName = $image->getClientOriginalName();
            $originalNameWithoutSpaces = str_replace(' ', '_', $originalName);
            $fileName = time() . '_' . $originalNameWithoutSpaces;
            $image->storeAs('public/images/receipt', $fileName);
            $expense->receipt = $fileName;
        }
        
        $expense->update();
        //dd($request->all());
        return response()->json($expense);
    }

    public function destroy($id)
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();
        return response()->json(['message' => 'dépense supprimée avec succès ']);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls|max:2048',
        ]);
        $file = $request->file('file');
        if ($file->isValid()) {
            
            
        
            // On génère un nom unique pour le fichier
            $fileName = time() . '_' . $file->getClientOriginalName();
        
            // On stocke le fichier dans le dossier "uploads"
            $path = $file->storeAs('uploads', $fileName);
        
            // On charge le fichier Excel avec la librairie PHPSpreadsheet
            $reader = IOFactory::createReaderForFile(storage_path('app/'.$path));
            $reader->setReadDataOnly(true);
            $spreadsheet = $reader->load(storage_path('app/'.$path));
        
            // On récupère la première feuille du fichier
            $worksheet = $spreadsheet->getActiveSheet();
        
            // On boucle sur les lignes de la feuille en ignorant la première ligne (l'en-tête)
            foreach ($worksheet->getRowIterator(2) as $row) {
                // On récupère les valeurs de la ligne

                $description = $worksheet->getCellByColumnAndRow(1, $row->getRowIndex())->getValue();
                $amount = $worksheet->getCellByColumnAndRow(2, $row->getRowIndex())->getValue();
                $expense_date = $worksheet->getCellByColumnAndRow(3, $row->getRowIndex())->getValue();
                $expense_date_formatted = !empty($expense_date) ? strtotime(Carbon::parse($expense_date)->format('Y/m/d')) : null;

                // $expense_category = $worksheet->getCellByColumnAndRow(4, $row->getRowIndex())->getValue();
                // $project = $worksheet->getCellByColumnAndRow(5, $row->getRowIndex())->getValue();
                // $team_member = $worksheet->getCellByColumnAndRow(6, $row->getRowIndex())->getValue();
                $billable = $worksheet->getCellByColumnAndRow(7, $row->getRowIndex())->getValue();

                $normalizedExpenseCategory = mb_strtolower($worksheet->getCellByColumnAndRow(4, $row->getRowIndex())->getValue(), 'UTF-8');
                $normalizedProject = mb_strtolower($worksheet->getCellByColumnAndRow(5, $row->getRowIndex())->getValue(), 'UTF-8');
                $normalizedTeamMember = mb_strtolower($worksheet->getCellByColumnAndRow(6, $row->getRowIndex())->getValue(), 'UTF-8');

                // Recherche dans la base de données en utilisant les chaînes normalisées
                $expenseCategory = ExpenseCategory::whereRaw('name= ?', [$normalizedExpenseCategory])->first();
                $project = Project::whereRaw('title= ?', [$normalizedProject])->first();
                $teamMember = User::whereRaw('name= ?', [$normalizedTeamMember])->first();
                $date = strtotime('06/08/2024');

                    $insertData = [
                        'description' => $description,
                        'expense_date' => date('Y-m-d',$date),
                        'amount' => $amount,
                        'expense_category' => $expenseCategory ? $expenseCategory->id : NULL,
                        'project' => $project ? $project->id : NULL,
                        'team_member' => $teamMember ? $teamMember->id: NULL,
                        'billable' => ($billable == "oui") ? 1 : NULL,
                    ];
                
                    if (!empty($description) ) {


                    DB::table('expenses')->insert($insertData);
               
                    }

            }
            return response()->json(['message' => 'Dépenses importées avec succès']);
            //var_dump($name);
            
        }else {
            return response()->json(['message' => 'bakhoul']);
        }
        
       
    }
    
}

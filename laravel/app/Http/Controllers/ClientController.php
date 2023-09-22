<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all()->map(function ($client) {
            // Générez le chemin complet de l'image
            $client->image_url = asset("storage/images/{$client->image}");
            return $client;
        });
        return response()->json($clients);
    }

    public function store(Request $request)
    {
        
            $image = $request->file('file');

            // Générez un nom de fichier unique
            $originalName = $image->getClientOriginalName();
            $originalNameWithoutSpaces = str_replace(' ', '_', $originalName);

            $fileName = time() . '_' . $originalNameWithoutSpaces;


            // Déplacez le fichier téléchargé vers le répertoire de stockage
            $image->storeAs('public/images', $fileName);

            // Créez un nouvel enregistrement de client avec le nom du fichier
            $client = new Client;
            $client->name = $request->name;
            $client->company_name = $request->company_name;
            $client->phone = $request->phone;
            $client->image = $fileName; // Stockez le nom du fichier dans la base de données
            $client->save();

            return response()->json($client);
    }

    public function show($id)
    {
        $client = Client::findOrFail($id);
        if (!$client) {
            return response()->json(['message' => 'Client not found'], 404);
        }
    
        // Générez le chemin complet de l'image
        $client->image_url = asset("storage/images/{$client->image}");
        return response()->json($client);
    }

    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);
        $client->name = $request->name;
        $client->company_name = $request->company_name;
        $client->phone = $request->phone;
    
        $image = $request->file('file');
    
        // Vérifier si l'image a été correctement téléchargée
        if (!$image) {
            return response()->json(['error' => 'Aucune image n\'a été téléchargée.'], 400);
        }
    
        // Générez un nom de fichier unique
        $originalName = $image->getClientOriginalName();
        $originalNameWithoutSpaces = str_replace(' ', '_', $originalName);
    
        $fileName = time() . '_' . $originalNameWithoutSpaces;
    
        // Supprimer l'image existante s'il y en a
        if ($client->image) {
            Storage::delete('public/images/' . $client->image);
        }
    
        // Déplacez le fichier téléchargé vers le répertoire de stockage
        $image->storeAs('public/images', $fileName);
    
        $client->image = $fileName;
    
        if ($client->update()) {
            return response()->json($client);
        }
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
                $name = $worksheet->getCellByColumnAndRow(1, $row->getRowIndex())->getValue();
                $numero = $worksheet->getCellByColumnAndRow(2, $row->getRowIndex())->getValue();
                $entreprise = $worksheet->getCellByColumnAndRow(3, $row->getRowIndex())->getValue();

                \Log::info('Name: ' . $name);
                \Log::info('Numero: ' . $numero);
                \Log::info('Entreprise: ' . $entreprise);
        
                // On supprime les espaces en début et fin de chaîne pour le nom et le numéro
                $name = trim($name);
                $numero = str_replace(" ", "", $numero);
        
                // On vérifie que le nom et le numéro sont non vides
                if (empty($name) || empty($numero)) {
                    continue;
                }
        
                // On vérifie que le numéro est valide (contient uniquement des chiffres, des espaces ou des signes + et -)
                if (!preg_match('/^[\d\s\+\-]+$/', $numero)) {
                    continue;
                }
        
               
                $exists = DB::table('clients')
                    ->where('name', $name)
                    ->where('phone', $numero)
                    ->exists();
        
                 if (!$exists) {
                     
                    $insertData = [
                        'name' => $name,
                        'phone' => $numero,
                        'company_name' => $entreprise,
                    ];
                
                    DB::table('clients')->insert($insertData);
                }
               

            }
            return response()->json(['message' => 'Clients2 importés avec succès']);
            var_dump($name);
            
        }else {
            return response()->json(['message' => 'bakhoul']);
        }
        
       
    }
    
    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'client supprimée avec succès ']);
    }


}

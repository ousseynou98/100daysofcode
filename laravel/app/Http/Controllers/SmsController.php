<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Httpful\Request as HttpfulRequest;
use App\Models\Contact;
use App\Models\SMS;

class SmsController extends Controller
{
    public function sendSMS(Request $request)
    {
        //require_once('http://smsapi.ehodcorp.com/vendor/httpful/httpful.phar');
        //require_once('smsapi.ehodcorp.com/vendor/httpful/httpful.phar');

        // $httpfulPhar = file_get_contents('http://smsapi.ehodcorp.com/vendor/httpful/httpful.phar');
        // eval($httpfulPhar);

        // Récupérer l'ID de la campagne à partir de la requête
        $idCampagne = $request->input('idCampagne');

        // Récupérer les numéros de téléphone et les noms des contacts à partir de la campagne
        if ($idCampagne == 6) {
            $contacts = Contact::where('id_campagne', $idCampagne)->take(1000)->get();
        } else {
            $contacts = Contact::where('id_campagne', $idCampagne)->get();
        }

        // Préparer les données pour l'envoi de SMS
        $login = 'Cursive';
        $api_access_key = '66672c70089dc042746abf7eaa19ae4e';
        $token = 'a19bafd76fd02028c987d8ee0a1dc763';
        $subject = 'test_API';
        $signature = 'AJANA';
        $sender = 'AJANA';
        $content = "Deweneti cher(e) %s. " . $request->input('message'); // %s sera remplacé par le nom du contact

        // Envoyer les SMS
        $successCount = 0;
        $failedCount = 0;
        $failedNumbers = [];

        foreach ($contacts as $contact) {
            $phoneNumber = $contact->numero;
            $name = $contact->nom;
            $messageToSend = sprintf($content, $name); // Remplacer %s par le nom du contact
            $text = rawurlencode(iconv("UTF-8", "ISO-8859-1//TRANSLIT", $messageToSend));

            $params = [
                'token' => $token,
                'subject' => $subject,
                'signature' => $signature,
                'recipient' => $phoneNumber,
                'content' => $text,
                'timestamp' => time()
            ];

            $uri = 'https://apisms.promobile.sn/api';
            $response = HttpfulRequest::post($uri)
                ->body(http_build_query($params))
                ->authenticateWith($login, $token)
                ->send();

            // // Vérifier si l'envoi a réussi
            if (preg_match('/^[0-9]+$/', $response)) {
                // L'envoi a réussi, car $response contient un ID de message valide
                $successCount++;
            } //else {
            //     // L'envoi a échoué
            //     $failedCount++;
            //     $failedNumbers[] = $phoneNumber;
            // }
        }

        // Enregistrer les messages envoyés dans la table "SMS"
        $sms = new SMS;
        $sms->message = $content;
        $sms->numeros = implode(', ', $contacts->pluck('numero')->toArray());
        $sms->numeros_envoyes = $successCount;
        $sms->campagne = $idCampagne;
        $sms->numeros_echoues = $failedCount;
         if ($failedCount > 0) {
            $sms->numeros_echoues_details = implode(', ', $failedNumbers);
        }
        $sms->save();

        // Retourner la réponse HTTP
        if ($failedCount > 0) {
            return response([
                'message' => 'Envoi de message terminé avec '.$successCount.' numéros envoyés et '.$failedCount.' numéros échoués.',
                'numeros_echoues_details' => $failedNumbers,
            ], 500);
        } else {
            return response([
                'message' => 'Envoi de message terminé avec succès.',
            ], 200);
        }
    }

}
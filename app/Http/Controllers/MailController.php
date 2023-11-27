<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class MailController extends Controller
{
    public static function sendMail($to, $subject, $body, $caption = '') {
        $mail = new PHPMailer(true);
		$return = (object)[
            "success" => true,
            "error" => false
        ];

        if(!is_array($to)) $to = [$to];

		try {
			//Server settings
			$mail->isSMTP();                                  //Send using SMTP
			// $mail->SMTPDebug = 3;
			$mail->SMTPAuth   = false;                        //Enable SMTP authentication
			// $mail->SMTPSecure = "TLS";					  //Enable implicit TLS encryption
			$mail->Host       = env('MAIL_HOST');             //Set the SMTP server to send through
			$mail->Port       = env('MAIL_PORT');             //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
			$mail->Username   = env('MAIL_USERNAME');         //SMTP username
			$mail->Password   = env('MAIL_PASSWORD');         //SMTP password

			//Recipients
			$mail->setFrom('dev@synapticsoftware.net', 'Synaptic Software');
			foreach($to as $address) $mail->addAddress($address);                           //Add a recipient

			//Content
			$mail->isHTML(true);                              //Set email format to HTML
			$mail->Subject = $subject;
			$mail->Body    = self::formatEmail($mail, $body, $caption ? $caption : $subject);
			$mail->AltBody = strip_tags(preg_replace('#<br\s*/?>#i', "\n", $body));

			$mail->send();

		} catch (Exception $e) {
            $return->error = $e->getMessage();
            $return->success = false;
		}
                
        return $return;
    }


    private static function formatEmail($phpmail, $body, $caption) {
        $to = array_keys($phpmail->getAllRecipientAddresses())[0];
    $html = <<< ENDOFFILE
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org=/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-weight: 300;font-size:14px;min-height: 100%;height: 100%;">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name=”x-apple-disable-message-reformatting”>
    </head>
    
    <body style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;margin: 0;padding: 0;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-weight: 300;min-height: 100%;height: 100%;width: 100%;">
    <table id="wrapper" cellpadding="20" cellspacing="0" border="0" id="backgroundTable" style="width: 100%;background-color: hsl(196, 100%, 98%);font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;font-weight: 300;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;line-height: 100%;height: 100%;">
        <tbody><tr><td style="border-collapse: collapse;vertical-align: top;">
    
            <table id="contentTable" cellpadding="0" cellspacing="0" border="0" style="background-color: #fff;margin: 0 auto;width: 680px;border: solid 1px #ddd;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                <tbody><tr><td style="border-collapse: collapse;vertical-align: top;">
    
                    <table id="header" cellpadding="20" cellspacing="0" border="0" style="border-bottom: solid 1px #ddd;width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                        <tbody><tr>
                            <td style="color: #444;font-size: 31px;font-weight: bold;border-collapse: collapse;vertical-align: middle;">
                                <a href="https://leifnervick.com"><img src="data:image/png;base64,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" width="250" alt="Leif Nervick | Web Developer Logo" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;"></a>
                            </td>
                            <td id="caption" style="color: #444;font-size: 24px;line-height:24px;font-weight: bold;border-collapse: collapse;vertical-align: middle;">
                            $caption
                            </td>
                        </tr></tbody>
                    </table>
                    <table cellpadding="30" cellspacing="0" border="0" style="width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                        <tbody><tr><td id="message" style="border-collapse: collapse;vertical-align: top;">
    
                            <table cellpadding="10" cellspacing="0" border="0" style="width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                <tbody><tr><td style="border-collapse: collapse;vertical-align: top;" class="description">
                                    $body
                                    <br><br>
                                    </td></tr>
                                </tbody>
                            </table></td></tr>
                        </tbody>
                    </table></td></tr>
                </tbody>
            </table>
    
            <table id="contentTable" cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;width: 680px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                <tbody><tr><td style="border-collapse: collapse;vertical-align: top;">
                    <table cellpadding="10" cellspacing="0" border="0" style="width: 100%;text-align: center;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                        <tbody><tr><td style="border-collapse: collapse;vertical-align: top;" class="description">
                            <br>
                            This email was sent to <span class="notranslate">$to</span> on behalf of <span class="notranslate">Leif Nervick | Web Developer</span>.
                            You are receiving this email as necessary correspondence.<br><br>If you have any questions or concerns, reply to this email or call us at <a href="tel:7209125225">(720) 912-5225</a>.
                            </td></tr>
                        </tbody>
                    </table></td></tr>
                </tbody>
            </table>

            </td></tr>
        </tbody>
    </table>
    
    <!--<div style="text-align:center;font-size:0.7em;padding:5px;"><a href="http://leifnervick.com">Leif Nervick | Web Developer</a> - <a href="tel:7209125225">(720) 912-5225</a></div>-->
    
    <style type="text/css">
    
        #outlook a {padding:0;}
        body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
        .ExternalClass {width:100%;}
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
        #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important; height: 100% !important;}
    
            /* INLINE */
        img {outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;}
        a img {border:none;}
        a {color: inherit;}
        .image_fix {display:block;}
        table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
    
        table td {border-collapse: collapse; vertical-align: top;}
    
        body, html { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 300; min-height: 100%; height: 100%; }

        .description { font-size: 16px; color: #555; line-height: 16px; font-weight: 300; margin: 20px 40px; }
        b { font-weight:bold !important; }
        p { margin-top:16px !important; }
    
        @media only screen and (max-device-width: 720px) {
            table[id="header"] td { text-align: center !important; }
            table[id="contentTable"] { width: 100% !important; min-width: 320px; }
            #caption { display: none; }
            .description { margin: 20px 10px; }
        }
    
        @media only screen and (max-device-width: 480px) {
            .mobile-clear { display: block !important; clear: both !important; }
            .mobile-hide { display: none !important; }	
            table[id="wrapper"] > tbody > tr > td { padding: 0 !important; }	
            table[id="wrapper"] > tbody > tr > td > table { border: none !important; }	
            td[id="message"] {padding: 30px 0 !important; }
            table[id="account-info"] td { text-align: center !important; }	
            td[class="avatar"] { display: none !important; }	
            table[id="questions"] b { display: block; }	
            table[id="questions"] a { display: block; }
            td[class="account-info-spacing"] { display: none !important; }	
            td[class="account-info-wrapper"] { width: 100% !important; }	
            td[class="account-info-wrapper"] table { width: 100% !important; }	
            a[href^="tel"], a[href^="sms"] { text-decoration: none; color: black; /* or whatever your want */ pointer-events: none; cursor: default; }	
            .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] { text-decoration: default; color: red !important; /* or whatever your want */ pointer-events: auto; cursor: default; }
        }
    
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
            a[href^="tel"], a[href^="sms"] { text-decoration: none; color: blue; /* or whatever your want */ pointer-events: none; cursor: default; }
            .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] { text-decoration: default; color: orange !important; pointer-events: auto; cursor: default; }	
        }
    
    </style>
    </body>
    </html>
    
ENDOFFILE;
        return $html;
    
    }
}

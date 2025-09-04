<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = htmlspecialchars($_POST['name']);
    $phone   = htmlspecialchars($_POST['phone']);
    $email   = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // SMTP settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your@email.com'; 
        $mail->Password   = 'your-app-password'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('your@email.com', 'Premium Park');

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Mesazh i ri nga Premium Park';
        $mail->Body    = "
            <h3>Detajet e Kontaktit</h3>
            <p><strong>Emri:</strong> {$name}</p>
            <p><strong>Telefoni:</strong> {$phone}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Mesazhi:</strong><br>{$message}</p>
        ";

        $mail->send();
        echo "✅ Mesazhi u dërgua me sukses!";
    } catch (Exception $e) {
        echo "❌ Mesazhi nuk u dërgua. Error: {$mail->ErrorInfo}";
    }
}
?>

<?php

class DB {
   
    private $host = "127.0.0.1"; 
    private $port = "3307"; 
    private $dbname = "mycampus_cafe";
    private $username = "root";
    private $password = "";

    public function connect() {
        try {
            // 3. Added ;port= to the DSN connection string below
            $pdo = new PDO(
                "mysql:host={$this->host};port={$this->port};dbname={$this->dbname}",
                $this->username,
                $this->password
            );

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $pdo;

        } catch (PDOException $e) {
            die("Database Connection Error: " . $e->getMessage());
        }
    }
}
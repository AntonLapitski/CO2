<?php

namespace App\Core\Http;


class HttpRequest
{
    private $type;
    private $variables;
    private $host;
    private $url;

    public function __construct(string $type, array $variables, string $host, string $url)
    {
        $this->type = $type;
        $this->variables = $variables;
        $this->host = $host;
        $this->url = $url;
    }

    static public function generate(): self
    {
        $result = new self($_SERVER['REQUEST_METHOD'], $_REQUEST
            , $_SERVER['HTTP_HOST'], self::parseUrl());
        //@TODO add cookie ....
        return $result;
    }

    /**
     * @return string
     */
    private static function parseUrl(): string
    {
        if (isset($_GET['url'])) {
            $url = $_GET['url'];
            if ($url == '') {
                $url = '/';
            } else {
                $url = '/' . $url;
            }
            return $url;

        }

        return '/';
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @return array
     */
    public function getVariables(): array
    {
        return $this->variables;
    }

    /**
     * @return string
     */
    public function getHost(): string
    {
        return $this->host;
    }

    /**
     * @return string
     */
    public function getUrl(): string
    {
        return $this->url;
    }
}
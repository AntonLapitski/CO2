<?php

namespace App\Core\Http;


class HttpResponse
{
    private $headers = [];
    private $statusCode = 200;
    private $body = "";

    /**
     * @return array
     */
    public function getHeaders(): array
    {
        return $this->headers;
    }

    /**
     * @param string $key
     * @param string $value
     * @return HttpResponse
     */
    public function addHeader(string $key, string $value): self
    {
        if (!isset($this->headers[$key])) {
            $this->headers[$key] = $value;
        }

        return $this;
    }

    /**
     * @return int
     */
    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    /**
     * @param int $statusCode
     * @return HttpResponse
     */
    public function setStatusCode(int $statusCode): self
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    /**
     * @return string
     */
    public function getBody(): string
    {
        return $this->body;
    }

    /**
     * @param string $body
     */
    public function setBody(string $body): void
    {
        $this->body = $body;
    }

    public function render()
    {
        //send headers
        foreach ($this->getHeaders() as $header => $value) {
            header($header . ': ' . $value);
        }
        //send status code
        http_response_code($this->getStatusCode());
        //send body
        echo $this->getBody();
    }

}
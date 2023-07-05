<?php

namespace Tests\Services;

trait RedirectAtDocumentRoot
{
    /***
     * ドキュメントルート以下のリダイレクトを再現
     * www/html/laravel-app-link -> www/laravel-app/public/
     * @param String $requestUrl
     * @return array|String|string[]
     */
    public function redirectAtDocumentRoot(String $requestUrl)
    {
        return str_replace(config('app.sub_path'),'', $requestUrl);
    }
}

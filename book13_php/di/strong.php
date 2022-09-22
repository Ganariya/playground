<?php
class UserCatRepository
{
    private array $config;
    // MySQL で実装されている
    public function __construct()
    {
        $this->config = ['host' => 'xxx.xxx.xxx.xxx'];
    }
}
class GachaDrawInteractor
{
    private UserCatRepository $userCatRepository;
    public function __construct()
    {
        $this->userCatRepository = new UserCatRepository();
    }
}

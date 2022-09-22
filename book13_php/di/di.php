<?php

class UserCatRepository
{
    private array $config;
    // MySQL で実装されている
    public function __construct(array $config)
    {
        $this->config = $config;
    }
}
class GachaDrawInteractor
{
    private UserCatRepository $userCatRepository;
    public function __construct(UserCatRepository $userCatRepository)
    {
        $this->userCatRepository = $userCatRepository;
    }
}

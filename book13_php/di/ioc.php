<?php

interface UserCatRepositoryInterface
{
    public function find($id): UserCat;
    public function findAll(): array;
    public function delete($id): void;
}
class UserCatRepository extends UserCatRepositoryInterface
{
}
class GachaDrawInteractor
{
    private UserCatRepositoryInterface $userCatRepository;
    public function __construct(UserCatRepositoryInterface $userCatRepository)
    {
        $this->userCatRepository = $userCatRepository;
    }
}

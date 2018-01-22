<?php

function roles()
{
    return \Spatie\Permission\Models\Role::pluck('text_name', 'name');
}
<?php

/** @var \App\Model\Comment[] $comments */
/** @var \App\Service\Router $router */

$title = 'Comments List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Comments List</h1>

    <a href="<?= $router->generatePath('comment-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($comments as $comment): ?>
            <li>
                <h3><?= $comment->getAuthor() ?></h3>
                <p><?= $comment->getContent() ?></p>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('comment-edit', ['id' => $comment->getId()]) ?>">Edit</a></li>
                    <li><a href="<?= $router->generatePath('comment-delete', ['id' => $comment->getId()]) ?>">Delete</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

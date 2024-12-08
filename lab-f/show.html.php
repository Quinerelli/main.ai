<?php

/** @var \App\Model\Comment $comment */
/** @var \App\Service\Router $router */

$title = "Comment ({$comment->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1>Comment Details</h1>
    <article>
        <strong>Author:</strong> <?= $comment->getAuthor(); ?><br>
        <strong>Post ID:</strong> <?= $comment->getPostId(); ?><br>
        <strong>Content:</strong>
        <p><?= $comment->getContent(); ?></p>
    </article>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('comment-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('comment-edit', ['id' => $comment->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

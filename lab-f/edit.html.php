<?php

/** @var \App\Model\Comment $comment */
/** @var \App\Service\Router $router */

$title = 'Edit Comment';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Edit Comment</h1>

    <form action="<?= $router->generatePath('comment-edit', ['id' => $comment->getId()]) ?>" method="post" class="edit-form">
        <input type="hidden" name="comment[id]" value="<?= $comment->getId() ?>"> <!-- Ustawiamy ukryte pole z ID -->
        <div class="form-group">
            <label for="author">Author</label>
            <input type="text" id="author" name="comment[author]" value="<?= htmlspecialchars($comment->getAuthor(), ENT_QUOTES, 'UTF-8') ?>" required>
        </div>
        <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" name="comment[content]" required><?= htmlspecialchars($comment->getContent(), ENT_QUOTES, 'UTF-8') ?></textarea>
        </div>
        <div class="form-group">
            <input type="submit" value="Save changes">
        </div>
    </form>
    <a href="<?= $router->generatePath('comment-index') ?>">Back to Comments</a>


<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

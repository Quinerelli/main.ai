<?php

/** @var \App\Model\Comment $comment */
/** @var \App\Service\Router $router */

$title = 'Create Comment';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Comment</h1>
    <form action="<?= $router->generatePath('comment-create') ?>" method="post" class="edit-form">
        <div class="form-group">
            <label for="author">Author</label>
            <input type="text" id="author" name="comment[author]" required>
        </div>

        <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" name="comment[content]" rows="5" required></textarea>
        </div>

        <div class="form-group">
            <input type="submit" value="Submit">
        </div>
    </form>
    <a href="<?= $router->generatePath('comment-index') ?>">Back to Comments</a>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';

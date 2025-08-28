#!/bin/bash
echo "Creating redesigned FAQ Library..."
cat > docs/support/zipflow-faq-library-new.html << 'HTML_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZipFlow FAQ Library | Justin Arndt - Technical Writer</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body>
    <h1>FAQ Library - Modern Redesign</h1>
    <p>This is a test file to verify writing capability.</p>
</body>
</html>
HTML_EOF
echo "File created successfully"

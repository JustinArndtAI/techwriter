// Documentation JavaScript - Enhanced Interactivity
document.addEventListener('DOMContentLoaded', function() {
    
    // Table of Contents Generation
    function generateTOC() {
        const toc = document.getElementById('table-of-contents');
        if (!toc) return;
        
        const headings = document.querySelectorAll('h2, h3');
        const tocList = document.createElement('ul');
        
        headings.forEach((heading, index) => {
            const id = heading.id || `heading-${index}`;
            heading.id = id;
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            a.className = heading.tagName.toLowerCase();
            
            li.appendChild(a);
            tocList.appendChild(li);
        });
        
        toc.appendChild(tocList);
    }
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Copy Code Functionality
    document.querySelectorAll('.code-block').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        
        button.addEventListener('click', function() {
            const code = block.querySelector('pre').textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
        
        block.appendChild(button);
    });
    
    // Search Functionality
    const searchInput = document.getElementById('doc-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const sections = document.querySelectorAll('.doc-section');
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
    
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            document.body.classList.add('dark-mode');
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }
    
    // Collapsible Sections
    document.querySelectorAll('.collapsible').forEach(item => {
        const header = item.querySelector('.collapsible-header');
        const content = item.querySelector('.collapsible-content');
        
        header.addEventListener('click', function() {
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            header.classList.toggle('active');
        });
    });
    
    // Progress Indicator
    function updateProgressIndicator() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }
    
    window.addEventListener('scroll', updateProgressIndicator);
    
    // Interactive Checklists
    document.querySelectorAll('.interactive-checklist input[type="checkbox"]').forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        checkbox.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
            updateProgress();
        });
    });
    
    function updateProgress() {
        const checkboxes = document.querySelectorAll('.interactive-checklist input[type="checkbox"]');
        const checked = document.querySelectorAll('.interactive-checklist input[type="checkbox"]:checked');
        const progressElement = document.getElementById('checklist-progress');
        
        if (progressElement) {
            const percentage = (checked.length / checkboxes.length) * 100;
            progressElement.textContent = `${Math.round(percentage)}% Complete`;
            progressElement.style.width = percentage + '%';
        }
    }
    
    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            answer.style.display = 'none';
            
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-answer').forEach(a => {
                    a.style.display = 'none';
                });
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                });
                
                // Toggle current item
                if (!isOpen) {
                    answer.style.display = 'block';
                    question.classList.add('active');
                }
            });
        }
    });
    
    // Print Friendly
    const printButton = document.getElementById('print-doc');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Initialize
    generateTOC();
    updateProgress();
    updateProgressIndicator();
});

// API Code Snippet Tabs
function switchTab(tabName, groupName) {
    const tabContents = document.querySelectorAll(`.tab-content[data-group="${groupName}"]`);
    const tabButtons = document.querySelectorAll(`.tab-button[data-group="${groupName}"]`);
    
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    const activeContent = document.getElementById(tabName);
    if (activeContent) {
        activeContent.style.display = 'block';
    }
    
    const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Export functions for use in HTML
window.switchTab = switchTab;
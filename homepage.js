// JS moved from homepage.html

// Dark mode toggle functionality
document.getElementById('darkModeToggle').addEventListener('click', function() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Show notification
    showNotification('Theme Updated', `Switched to ${newTheme} mode`);
});

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
}

// Customer details toggle functionality
function toggleCustomerDetails(customerId) {
    const detailsElement = document.getElementById(`${customerId}-details`);
    const isActive = detailsElement.classList.contains('active');
    
    // Create or get modal overlay
    let modalOverlay = document.querySelector('.modal-overlay');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        document.body.appendChild(modalOverlay);
    }
    
    // Hide all customer details first
    document.querySelectorAll('.customer-details').forEach(details => {
        details.classList.remove('active');
    });
    
    // Toggle the clicked customer's details
    if (!isActive) {
        detailsElement.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
        detailsElement.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modalOverlay = document.querySelector('.modal-overlay');
    const customerDetails = document.querySelector('.customer-details.active');
    
    if (modalOverlay && customerDetails && event.target === modalOverlay) {
        customerDetails.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modalOverlay = document.querySelector('.modal-overlay');
        const customerDetails = document.querySelector('.customer-details.active');
        
        if (modalOverlay && customerDetails) {
            customerDetails.classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Analytics tabs functionality
document.querySelectorAll('.analytics-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs and panels
        document.querySelectorAll('.analytics-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.analytics-panel').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        this.classList.add('active');
        const panelId = this.getAttribute('data-tab');
        document.querySelector(`.analytics-${panelId}`).classList.add('active');
    });
});

// Notification system
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <button class="notification-close">✕</button>
    `;
    
    const notificationCenter = document.getElementById('notificationCenter');
    notificationCenter.appendChild(notification);
    
    // Add click event to close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Sample activity data
const activities = [
    {
        icon: '📝',
        title: 'New KB Article Created',
        meta: 'VPN Configuration Guide - ABC Ltd',
        time: '2 hours ago'
    },
    {
        icon: '🔄',
        title: 'Article Updated',
        meta: 'Office 365 Deployment - XYZ Corp',
        time: '4 hours ago'
    },
    {
        icon: '👥',
        title: 'Team Collaboration',
        meta: 'Security Standards - EFG Solutions',
        time: '1 day ago'
    }
];

// Load activities into the feed
function loadActivities() {
    const activityFeed = document.querySelector('.main-activity-feed');
    if (!activityFeed) return;
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-meta">${activity.meta}</div>
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        activityFeed.appendChild(activityItem);
    });
}

// Quick Stats & Insights Section
function initializeQuickStats() {
    // Add hover effects to stat cards
    document.querySelectorAll('.kb-stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });

    // Make trending topics clickable
    document.querySelectorAll('.insight-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const title = this.querySelector('.insight-name').textContent;
            showNotification('Topic Preview', `Showing preview for: ${title}`, 'info');
        });
    });

    // Add refresh data button functionality
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'kb-btn';
    refreshBtn.innerHTML = '🔄 Refresh Data';
    refreshBtn.style.marginLeft = 'auto';
    
    const statsHeader = document.querySelector('.kb-card-header');
    if (statsHeader) {
        statsHeader.querySelector('.kb-card-actions').prepend(refreshBtn);
        
        refreshBtn.addEventListener('click', function() {
            this.disabled = true;
            this.innerHTML = '🔄 Refreshing...';
            
            // Simulate data refresh
            setTimeout(() => {
                updateStatsData();
                this.disabled = false;
                this.innerHTML = '🔄 Refresh Data';
                showNotification('Data Updated', 'Statistics have been refreshed', 'success');
            }, 1500);
        });
    }
}

// Recent Activity Section
function initializeRecentActivity() {
    const activityFeed = document.querySelector('.main-activity-feed');
    if (!activityFeed) return;

    // Add filter dropdown
    const filterContainer = document.createElement('div');
    filterContainer.className = 'activity-filters';
    filterContainer.innerHTML = `
        <select class="filter-select">
            <option value="all">All Activities</option>
            <option value="articles">Articles</option>
            <option value="updates">Updates</option>
            <option value="reviews">Reviews</option>
        </select>
    `;
    
    activityFeed.parentElement.insertBefore(filterContainer, activityFeed);
    
    // Add load more button
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'kb-btn';
    loadMoreBtn.innerHTML = 'Load More';
    loadMoreBtn.style.marginTop = 'var(--spacing)';
    loadMoreBtn.style.width = '100%';
    
    activityFeed.parentElement.appendChild(loadMoreBtn);
    
    // Filter functionality
    filterContainer.querySelector('select').addEventListener('change', function() {
        const filter = this.value;
        const items = activityFeed.querySelectorAll('.activity-item');
        
        items.forEach(item => {
            if (filter === 'all' || item.dataset.type === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Load more functionality
    loadMoreBtn.addEventListener('click', function() {
        this.disabled = true;
        this.innerHTML = 'Loading...';
        
        // Simulate loading more activities
        setTimeout(() => {
            const newActivities = [
                {
                    icon: '📊',
                    title: 'Analytics Updated',
                    meta: 'Monthly report generated',
                    time: '3 days ago',
                    type: 'updates'
                },
                {
                    icon: '👥',
                    title: 'Team Review',
                    meta: 'Security documentation reviewed',
                    time: '4 days ago',
                    type: 'reviews'
                }
            ];
            
            newActivities.forEach(activity => {
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';
                activityItem.dataset.type = activity.type;
                activityItem.innerHTML = `
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-meta">${activity.meta}</div>
                    </div>
                    <div class="activity-time">${activity.time}</div>
                    <button class="activity-mark-read">✓</button>
                `;
                activityFeed.appendChild(activityItem);
            });
            
            this.disabled = false;
            this.innerHTML = 'Load More';
            showNotification('New Activities', 'Loaded more activities', 'success');
        }, 1000);
    });
    
    // Mark as read functionality
    activityFeed.addEventListener('click', function(e) {
        if (e.target.classList.contains('activity-mark-read')) {
            const item = e.target.closest('.activity-item');
            item.style.opacity = '0.6';
            e.target.disabled = true;
            showNotification('Marked as Read', 'Activity marked as read', 'success');
        }
    });
}

// Knowledge Analytics Section
function initializeAnalytics() {
    // Add date range selector
    const dateRangeContainer = document.createElement('div');
    dateRangeContainer.className = 'analytics-date-range';
    dateRangeContainer.innerHTML = `
        <select class="filter-select">
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="custom">Custom Range</option>
        </select>
    `;
    
    const analyticsHeader = document.querySelector('#knowledge-analytics-main .kb-card-header');
    if (analyticsHeader) {
        analyticsHeader.querySelector('.kb-card-actions').prepend(dateRangeContainer);
    }
    
    // Make charts interactive
    document.querySelectorAll('.chart-bar').forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            const value = this.querySelector('.chart-value').textContent;
            showNotification('Chart Value', value, 'info');
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    // Add compare periods toggle
    const compareToggle = document.createElement('div');
    compareToggle.className = 'analytics-compare';
    compareToggle.innerHTML = `
        <label class="switch">
            <input type="checkbox" id="compareToggle">
            <span class="slider"></span>
        </label>
        <span>Compare with Previous Period</span>
    `;
    
    const analyticsContent = document.querySelector('#knowledge-analytics-main .kb-card-content');
    if (analyticsContent) {
        analyticsContent.insertBefore(compareToggle, analyticsContent.firstChild);
        
        // Toggle functionality
        document.getElementById('compareToggle').addEventListener('change', function() {
            if (this.checked) {
                showNotification('Comparison Mode', 'Showing comparison with previous period', 'info');
                // Here you would typically update the charts to show comparison data
            }
        });
    }
}

// Customer Cards
function initializeCustomerCards() {
    document.querySelectorAll('.customer-card').forEach(card => {
        // Add quick edit mode
        const editBtn = document.createElement('button');
        editBtn.className = 'customer-btn';
        editBtn.innerHTML = '✏️ Quick Edit';
        editBtn.style.marginTop = 'var(--spacing)';
        
        card.querySelector('.customer-actions').appendChild(editBtn);
        
        editBtn.addEventListener('click', function() {
            const card = this.closest('.customer-card');
            const name = card.querySelector('.customer-name');
            const originalName = name.textContent;
            
            name.innerHTML = `
                <input type="text" value="${originalName}" class="quick-edit-input">
                <button class="quick-edit-save">✓</button>
                <button class="quick-edit-cancel">✕</button>
            `;
            
            const input = name.querySelector('input');
            input.focus();
            
            name.querySelector('.quick-edit-save').addEventListener('click', function() {
                name.textContent = input.value;
                showNotification('Updated', `Customer name updated to: ${input.value}`, 'success');
            });
            
            name.querySelector('.quick-edit-cancel').addEventListener('click', function() {
                name.textContent = originalName;
            });
        });
        
        // Add share button
        const shareBtn = document.createElement('button');
        shareBtn.className = 'customer-btn';
        shareBtn.innerHTML = '📤 Share';
        shareBtn.style.marginTop = 'var(--spacing)';
        
        card.querySelector('.customer-actions').appendChild(shareBtn);
        
        shareBtn.addEventListener('click', function() {
            const customerName = this.closest('.customer-card').querySelector('.customer-name').textContent;
            showShareModal(customerName);
        });
    });
}

// Share Modal
function showShareModal(customerName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="customer-details active" style="max-width: 500px;">
            <div class="details-header">
                <h3>Share ${customerName}</h3>
                <button class="details-close">✕</button>
            </div>
            <div class="share-options">
                <div class="share-option">
                    <input type="email" placeholder="Enter email address" class="share-input">
                    <button class="kb-btn kb-btn-primary">Send</button>
                </div>
                <div class="share-option">
                    <input type="text" value="https://kb.example.com/share/${customerName.toLowerCase().replace(/\s+/g, '-')}" class="share-input" readonly>
                    <button class="kb-btn">Copy Link</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.details-close').addEventListener('click', () => {
        modal.remove();
    });
    
    // Copy link functionality
    modal.querySelector('.share-option:last-child .kb-btn').addEventListener('click', function() {
        const input = this.previousElementSibling;
        input.select();
        document.execCommand('copy');
        showNotification('Link Copied', 'Share link copied to clipboard', 'success');
    });
}

// Update stats data (for demo purposes)
function updateStatsData() {
    const stats = [
        { value: Math.floor(Math.random() * 100), label: 'Articles Created This Week' },
        { value: Math.floor(Math.random() * 2000), label: 'Knowledge Base Searches Today' },
        { value: Math.floor(Math.random() * 1000), label: 'Multi-Location Articles' },
        { value: Math.floor(Math.random() * 50), label: 'Pending Reviews' },
        { value: (Math.random() * 2 + 3).toFixed(1), label: 'Article Usefulness Rating' }
    ];
    
    document.querySelectorAll('.kb-stat-card').forEach((card, index) => {
        const stat = stats[index];
        card.querySelector('.kb-stat-value').textContent = stat.value;
        card.querySelector('.kb-stat-label').textContent = stat.label;
    });
}

// Initialize all new functionality
document.addEventListener('DOMContentLoaded', function() {
    loadActivities();
    initializeQuickStats();
    initializeRecentActivity();
    initializeAnalytics();
    initializeCustomerCards();
    showNotification('Welcome Back', 'Your knowledge base dashboard is ready');
}); 
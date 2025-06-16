/**
 * Instagram Gallery Integration for The Auto Refinery
 * Fetches and displays Instagram posts with fallback support
 */

class InstagramGallery {
    constructor() {
        this.instagramUsername = 'autorefinery.2025';
        this.fallbackPosts = [
            {
                id: 'fallback1',
                image: 'images/gallery1.jpg',
                caption: 'Premium mobile detailing transformation - Silver Detail Package delivered to your driveway!',
                likes: 47,
                comments: 8,
                date: '2 days ago',
                hashtags: '#MobileDetailing #Modesto'
            },
            {
                id: 'fallback2',
                image: 'images/gallery2.jpg',
                caption: 'Gold Detail Package results - comprehensive interior and exterior care at your location!',
                likes: 52,
                comments: 12,
                date: '4 days ago',
                hashtags: '#GoldDetail #CentralValley'
            },
            {
                id: 'fallback3',
                image: 'images/gallery3.jpg',
                caption: 'Before and after headlight restoration - crystal clear results in 45 minutes!',
                likes: 38,
                comments: 6,
                date: '1 week ago',
                hashtags: '#HeadlightRestoration #MobileService'
            },
            {
                id: 'fallback4',
                image: 'images/gallery4.jpg',
                caption: 'Platinum Detail Package - showroom quality results with ceramic protection included!',
                likes: 61,
                comments: 15,
                date: '1 week ago',
                hashtags: '#PlatinumDetail #CeramicProtection'
            },
            {
                id: 'fallback5',
                image: 'images/gallery5.jpg',
                caption: 'Complete engine bay cleaning - we bring professional care to every detail of your vehicle!',
                likes: 44,
                comments: 9,
                date: '2 weeks ago',
                hashtags: '#EngineBay #DetailingPerfection'
            },
            {
                id: 'fallback6',
                image: 'images/about.jpg',
                caption: 'Mobile convenience at its finest - we come to your workplace, home, or anywhere you need us!',
                likes: 73,
                comments: 18,
                date: '2 weeks ago',
                hashtags: '#MobileConvenience #TheAutoRefinery'
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInstagramFeed();
        this.updateLastUpdatedTime();
    }

    setupEventListeners() {
        // Refresh gallery button
        const refreshBtn = document.getElementById('refresh-gallery');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshGallery());
        }

        // Post click handlers for lightbox effect
        document.addEventListener('click', (e) => {
            if (e.target.closest('.instagram-post')) {
                this.handlePostClick(e.target.closest('.instagram-post'));
            }
        });

        // Close lightbox on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-backdrop')) {
                this.closeLightbox();
            }
        });

        // Close lightbox on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });
    }

    async loadInstagramFeed() {
        const loadingEl = document.getElementById('gallery-loading');
        const gridEl = document.getElementById('instagram-grid');
        const errorEl = document.getElementById('gallery-error');

        try {
            // Show loading state
            if (loadingEl) loadingEl.style.display = 'block';
            if (gridEl) gridEl.style.display = 'none';
            if (errorEl) errorEl.style.display = 'none';

            // Try to fetch from Instagram API (requires access token)
            const instagramData = await this.fetchInstagramPosts();
            
            if (instagramData && instagramData.length > 0) {
                this.renderInstagramPosts(instagramData);
            } else {
                // Fall back to static content
                this.renderFallbackPosts();
            }

        } catch (error) {
            console.log('Instagram API not available, using fallback content:', error);
            this.renderFallbackPosts();
        } finally {
            // Hide loading state
            if (loadingEl) loadingEl.style.display = 'none';
            if (gridEl) gridEl.style.display = 'grid';
        }
    }

    async fetchInstagramPosts() {
        // Note: This requires Instagram Basic Display API setup
        // For now, we'll use a placeholder that simulates API failure
        // to demonstrate the fallback functionality
        
        // Uncomment and configure when Instagram API is set up:
        /*
        const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
        const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
        const limit = 6;
        
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`
        );
        
        if (!response.ok) {
            throw new Error('Instagram API request failed');
        }
        
        const data = await response.json();
        return data.data;
        */
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Return null to trigger fallback
        return null;
    }

    renderInstagramPosts(posts) {
        const gridEl = document.getElementById('instagram-grid');
        if (!gridEl) return;

        const postsHTML = posts.map(post => this.createPostHTML(post, true)).join('');
        gridEl.innerHTML = postsHTML;

        // Add fade-in animation
        const postElements = gridEl.querySelectorAll('.instagram-post');
        postElements.forEach((post, index) => {
            setTimeout(() => {
                post.classList.add('fade-in-gallery');
            }, index * 100);
        });
    }

    renderFallbackPosts() {
        const gridEl = document.getElementById('instagram-grid');
        if (!gridEl) return;

        // Use existing fallback posts in HTML, just add animations
        const postElements = gridEl.querySelectorAll('.instagram-post');
        postElements.forEach((post, index) => {
            setTimeout(() => {
                post.classList.add('fade-in-gallery');
            }, index * 100);
        });
    }

    createPostHTML(post, isFromAPI = false) {
        const postClass = isFromAPI ? 'instagram-post api-loaded' : 'instagram-post fallback-post';
        const imageUrl = post.media_url || post.thumbnail_url || post.image;
        const caption = this.truncateCaption(post.caption || '', 120);
        const likes = post.like_count || Math.floor(Math.random() * 50) + 20;
        const comments = post.comments_count || Math.floor(Math.random() * 15) + 3;
        const date = this.formatDate(post.timestamp || new Date());
        const hashtags = this.extractHashtags(post.caption || post.hashtags || '');

        return `
            <div class="${postClass}" data-post-id="${post.id}">
                <div class="post-image" style="background-image: url('${imageUrl}');">
                    <div class="post-overlay">
                        <div class="post-stats">
                            <span><i class="fas fa-heart"></i> ${likes}</span>
                            <span><i class="fas fa-comment"></i> ${comments}</span>
                        </div>
                    </div>
                </div>
                <div class="post-caption">
                    <p>${caption}</p>
                    <div class="post-meta">
                        <span class="post-date">${date}</span>
                        <span class="post-hashtags">${hashtags}</span>
                    </div>
                </div>
            </div>
        `;
    }

    truncateCaption(caption, maxLength) {
        if (caption.length <= maxLength) return caption;
        return caption.substring(0, maxLength).trim() + '...';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 14) return '1 week ago';
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    }

    extractHashtags(caption) {
        const hashtags = caption.match(/#\w+/g);
        if (!hashtags) return '#MobileDetailing #TheAutoRefinery';
        return hashtags.slice(0, 3).join(' ');
    }

    handlePostClick(postElement) {
        // Create lightbox effect
        const backdrop = document.createElement('div');
        backdrop.className = 'lightbox-backdrop';
        document.body.appendChild(backdrop);

        const clone = postElement.cloneNode(true);
        clone.classList.add('enlarged');
        document.body.appendChild(clone);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            font-size: 1.2rem;
            z-index: 1001;
        `;
        closeBtn.addEventListener('click', () => this.closeLightbox());
        clone.appendChild(closeBtn);
    }

    closeLightbox() {
        const backdrop = document.querySelector('.lightbox-backdrop');
        const enlarged = document.querySelector('.instagram-post.enlarged');
        
        if (backdrop) backdrop.remove();
        if (enlarged) enlarged.remove();
        
        document.body.style.overflow = '';
    }

    refreshGallery() {
        const refreshBtn = document.getElementById('refresh-gallery');
        if (refreshBtn) {
            const icon = refreshBtn.querySelector('i');
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg)';
            }, 300);
        }

        this.loadInstagramFeed();
        this.updateLastUpdatedTime();
    }

    updateLastUpdatedTime() {
        const lastUpdatedEl = document.getElementById('last-updated');
        if (lastUpdatedEl) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
            lastUpdatedEl.textContent = `Updated at ${timeString}`;
        }
    }
}

// Initialize Instagram Gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('instagram-grid')) {
        new InstagramGallery();
    }
});

// Instagram API Setup Guide (for future implementation)
/*
To enable live Instagram integration:

1. Create a Facebook Developer Account
2. Create a new App and add Instagram Basic Display
3. Configure OAuth redirect URIs
4. Get your Access Token
5. Replace 'YOUR_INSTAGRAM_ACCESS_TOKEN' in fetchInstagramPosts()
6. Uncomment the API fetch code

For testing, you can use Instagram Test Users or the Graph API Explorer.

Required permissions: instagram_graph_user_profile, instagram_graph_user_media

Note: Access tokens expire and need refresh tokens for long-term use.
*/

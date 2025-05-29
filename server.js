const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoints for dummy data
app.get('/api/stats', (req, res) => {
    res.json({
        articlesCreated: 47,
        searchesToday: 1239,
        multiLocationArticles: 892,
        pendingReviews: 23,
        usefulnessRating: 4.8
    });
});

app.get('/api/customers', (req, res) => {
    res.json([
        {
            id: 'abc',
            name: 'ABC Ltd',
            type: 'Enterprise',
            locations: [
                { 
                    name: 'London HQ', 
                    country: '🇬🇧', 
                    address: '152 West End Lane London NW6 1SD',
                    phone: '+44 (0) 20 7433 3333',
                    notes: 'TDM Group support Engineer is available on-site daily from 8:30 am - 4:30 pm.'
                },
                { 
                    name: 'Manchester', 
                    country: '🇬🇧', 
                    address: '1 Piccadilly Gardens, Manchester M1 1RG',
                    phone: '+44 (0) 161 555 0123',
                    notes: 'Weekly site visits. Remote monitoring enabled.'
                },
                { 
                    name: 'Edinburgh', 
                    country: '🇬🇧', 
                    address: '1 Princes Street, Edinburgh EH2 2EQ',
                    phone: '+44 (0) 131 555 0456',
                    notes: 'Bi-weekly site visits. Backup systems in place.'
                },
                { 
                    name: 'New York', 
                    country: '🇺🇸', 
                    address: '1450 Broadway, New York, NY 10018',
                    phone: '+1 (212) 555-0123',
                    notes: 'Remote support only. Local IT contact: john.doe@abcltd.com'
                },
                { 
                    name: 'Frankfurt', 
                    country: '🇩🇪', 
                    address: 'Zeil 106, 60313 Frankfurt am Main',
                    phone: '+49 69 1234 5678',
                    notes: 'EU compliance center. GDPR contact: klaus.weber@abcltd.com'
                },
                { 
                    name: 'Singapore', 
                    country: '🇸🇬', 
                    address: '1 Raffles Quay, Singapore 048583',
                    phone: '+65 6789 0123',
                    notes: 'Regional support center. Contact: lisa.chen@abcltd.com'
                }
            ],
            stats: {
                articles: 247,
                locations: 6,
                users: 450
            }
        },
        {
            id: 'xyz',
            name: 'XYZ Corp',
            type: 'Business',
            locations: [
                { 
                    name: 'Birmingham', 
                    country: '🇬🇧', 
                    address: 'Colmore Plaza, 20 Colmore Circus, Birmingham B4 6AT',
                    phone: '+44 (0) 121 555 0123',
                    notes: 'Primary support center. On-site engineer available 9 AM - 5 PM weekdays.'
                },
                { 
                    name: 'Leeds', 
                    country: '🇬🇧', 
                    address: '1 City Square, Leeds LS1 2ES',
                    phone: '+44 (0) 113 555 0456',
                    notes: 'Weekly site visits. Remote monitoring enabled.'
                },
                { 
                    name: 'Bristol', 
                    country: '🇬🇧', 
                    address: '1 Castle Street, Bristol BS1 3AD',
                    phone: '+44 (0) 117 555 0789',
                    notes: 'Bi-weekly site visits. Backup systems in place.'
                },
                { 
                    name: 'Dublin', 
                    country: '🇮🇪', 
                    address: '1 Grand Canal Square, Dublin 2',
                    phone: '+353 1 555 0123',
                    notes: 'EU operations. Monthly site visits. Contact: mary.murphy@xyzcorp.ie'
                }
            ],
            stats: {
                articles: 89,
                locations: 4,
                users: 180
            }
        },
        {
            id: 'efg',
            name: 'EFG Solutions',
            type: 'Enterprise',
            locations: [
                { 
                    name: 'London', 
                    country: '🇬🇧', 
                    address: '30 Crown Place, London EC2A 4EB',
                    phone: '+44 (0) 20 7123 4567',
                    notes: 'Primary European operations center. 24/7 support available.'
                },
                { 
                    name: 'Paris', 
                    country: '🇫🇷', 
                    address: '142 Rue de Rivoli, 75001 Paris',
                    phone: '+33 1 4567 8901',
                    notes: 'French operations. Contact: pierre.martin@efgsolutions.fr'
                },
                { 
                    name: 'Munich', 
                    country: '🇩🇪', 
                    address: 'Maximilianstraße 2, 80539 München',
                    phone: '+49 89 1234 5678',
                    notes: 'German operations. GDPR compliance center.'
                },
                { 
                    name: 'Amsterdam', 
                    country: '🇳🇱', 
                    address: 'Zuidas, Gustav Mahlerlaan 1212',
                    phone: '+31 20 123 4567',
                    notes: 'Benelux operations. Contact: jan.vanderberg@efgsolutions.nl'
                },
                { 
                    name: 'Madrid', 
                    country: '🇪🇸', 
                    address: 'Paseo de la Castellana 123, 28046 Madrid',
                    phone: '+34 91 123 4567',
                    notes: 'Spanish operations. Contact: maria.garcia@efgsolutions.es'
                }
            ],
            stats: {
                articles: 156,
                locations: 5,
                users: 320
            }
        }
    ]);
});

app.get('/api/kb-articles', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'VPN Configuration Guide - ABC Ltd',
            description: 'Multi-site VPN setup for global offices',
            locations: ['London', 'New York', 'Singapore', 'Frankfurt', 'Manchester', 'Edinburgh'],
            category: 'Network Security',
            usage: {
                count: 247,
                period: 'this month'
            },
            lastUpdated: {
                date: '2024-12-12',
                author: 'Sarah Johnson'
            }
        },
        {
            id: 2,
            title: 'Office 365 Deployment - XYZ Corp',
            description: 'Regional rollout procedures for UK offices',
            locations: ['Birmingham', 'Leeds', 'Bristol', 'Dublin'],
            category: 'Productivity Suite',
            usage: {
                count: 89,
                period: 'this month'
            },
            lastUpdated: {
                date: '2024-12-10',
                author: 'Mike Chen'
            }
        },
        {
            id: 3,
            title: 'Security Standards - EFG Solutions',
            description: 'European compliance requirements',
            locations: ['All EU', 'GDPR'],
            category: 'Compliance',
            usage: {
                count: 156,
                period: 'this month'
            },
            lastUpdated: {
                date: '2024-12-08',
                author: 'Alex Brown'
            }
        }
    ]);
});

app.get('/api/recent-activity', (req, res) => {
    res.json([
        {
            id: 1,
            user: {
                name: 'Sarah Johnson',
                initials: 'SJ'
            },
            action: 'updated VPN guide for',
            customer: 'ABC Ltd Singapore',
            type: 'Multi-location article',
            timeAgo: '15 minutes ago'
        },
        {
            id: 2,
            user: {
                name: 'Mike Chen',
                initials: 'MC'
            },
            action: 'created new procedure for',
            customer: 'XYZ Corp Dublin',
            type: 'Location-specific',
            timeAgo: '1 hour ago'
        },
        {
            id: 3,
            user: {
                name: 'Alex Brown',
                initials: 'AB'
            },
            action: 'translated security policy for',
            customer: 'EFG Solutions EU',
            type: 'Multi-language',
            timeAgo: '2 hours ago'
        },
        {
            id: 4,
            user: {
                name: 'Emma Wilson',
                initials: 'EW'
            },
            action: 'synchronized content across',
            customer: 'ABC Ltd global offices',
            type: 'Content sync',
            timeAgo: '3 hours ago'
        }
    ]);
});

// Start server
app.listen(port, () => {
    console.log(`Knowledge Hub server running at http://localhost:${port}`);
}); 
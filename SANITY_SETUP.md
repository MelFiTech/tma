# Sanity CMS Setup Guide for The Magnet Academy

## ✅ **What's Been Completed**

### **1. Sanity Project Setup**
- ✅ **Project Created**: Project ID `0zvpcao3`
- ✅ **Dataset**: `production` 
- ✅ **Dependencies Installed**: All required Sanity packages
- ✅ **Schemas Created**: Blog posts and team members
- ✅ **Studio Route**: Available at `/studio`

### **2. Content Schemas**

#### **Team Members Schema**
- Full name, job title, biography
- Profile images with alt text
- Department categorization
- Campus location filtering
- Display order management
- Active/inactive toggle
- Optional LinkedIn profiles

#### **Blog Posts Schema** 
- Title, slug, excerpt, full content
- Featured images with alt text
- Category system (Education, Sports, Community, News, Events)
- Tags for organization
- Author attribution
- Publication dates
- Featured post highlighting

### **3. Next.js Integration**
- ✅ **Sanity Client**: Configured with queries
- ✅ **TypeScript Types**: Full type safety
- ✅ **Image Optimization**: Built-in Sanity image URLs
- ✅ **Team Component**: Updated to fetch from Sanity
- ✅ **Loading States**: Skeleton placeholders
- ✅ **Error Handling**: Graceful fallbacks

## 🚀 **Next Steps to Complete Setup**

### **Step 1: Add Environment Variables**
Add these to your `.env.local` file:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=0zvpcao3
NEXT_PUBLIC_SANITY_DATASET=production
```

### **Step 2: Access Sanity Studio**
1. Start your development server: `yarn dev`
2. Visit: `http://localhost:3000/studio`
3. Log in with your Google account (already configured)

### **Step 3: Populate Initial Data** 
1. Get a write token from [Sanity Manage](https://www.sanity.io/manage/project/0zvpcao3)
   - Go to API tab → Tokens → Create new token
   - Choose "Editor" permissions
   - Copy the token

2. Add token to your `.env.local`:
   ```bash
   SANITY_WRITE_TOKEN=your_token_here
   ```

3. Run the data population script:
   ```bash
   node scripts/populate-team-data.js
   ```

### **Step 4: Upload Team Photos** (Optional)
1. In Sanity Studio, go to Team Members
2. Edit each team member
3. Upload profile photos in the "Profile Image" field
4. Add alt text for accessibility

## 📁 **File Structure Created**

```
├── sanity/
│   └── schemas/
│       ├── index.ts          # Schema exports
│       ├── blogPost.ts       # Blog post schema
│       └── teamMember.ts     # Team member schema
├── src/
│   ├── app/studio/           # Sanity Studio route
│   ├── lib/sanity.ts         # Sanity client & queries
│   └── types/sanity.ts       # TypeScript types
├── scripts/
│   └── populate-team-data.js # Data migration script
├── sanity.config.ts          # Sanity configuration
└── sanity.cli.ts            # Sanity CLI configuration
```

## 🎯 **Features Now Available**

### **Content Management**
- ✅ **Visual Studio**: Edit content with rich text editor
- ✅ **Asset Management**: Upload and optimize images
- ✅ **Preview**: Real-time preview of changes
- ✅ **Version Control**: Document history and rollbacks

### **Team Section**
- ✅ **Dynamic Loading**: Fetches from Sanity
- ✅ **Location Filtering**: Filter by campus (Katsina ready)
- ✅ **Fallback Images**: Initials when no photo uploaded
- ✅ **Modal Biographies**: Click cards to read full bios
- ✅ **Loading States**: Smooth user experience

### **Blog System Ready**
- ✅ **Rich Content**: Portable text with embedded images
- ✅ **SEO Optimized**: Slugs, meta descriptions
- ✅ **Categorization**: Tags and categories
- ✅ **Featured Posts**: Highlight important content

## 🔧 **How to Use**

### **Adding Team Members**
1. Go to `/studio` → Team Member → Create new
2. Fill in all required fields
3. Upload a profile photo (optional)
4. Set display order for positioning
5. Publish when ready

### **Managing Blogs** 
1. Go to `/studio` → Blog Post → Create new
2. Write content using the rich text editor
3. Add featured image and categorize
4. Set publication date
5. Toggle "Featured Post" if needed

### **Next.js Components**
- Team data automatically loads from Sanity
- Images are optimized through Sanity's CDN
- Fallbacks ensure the site works even if Sanity is down

## 🔐 **Security & Performance**

- ✅ **CDN**: Images served through Sanity's global CDN
- ✅ **Caching**: Production builds use CDN caching
- ✅ **Type Safety**: Full TypeScript integration
- ✅ **Error Boundaries**: Graceful degradation

## 📈 **Future Enhancements**

### **Ready to Implement**
1. **Blog List Page**: Update to fetch from Sanity
2. **Blog Detail Pages**: Dynamic routing with Sanity content
3. **Additional Campuses**: Add team members for other locations
4. **Content Scheduling**: Publish posts at specific times
5. **Real-time Updates**: Live preview mode

### **Advanced Features**
1. **Content Localization**: Multi-language support
2. **User Roles**: Different permission levels
3. **Webhooks**: Trigger builds on content changes
4. **Analytics**: Track content performance

---

**🎉 Your Sanity CMS is ready to use!** 

Visit `/studio` to start managing your content and see the team section update automatically on your site. 
# Product Page Layout

This document describes the product page layout implementation for the Insearch application.

## Layout Structure

The product page is organized into several key sections:

### 1. Header Section
- Product logo
- Product name with category badge
- Description
- Star rating with review count
- Visit website button

### 2. Navigation Tabs
- Overview
- Launches
- Use Cases
- Team

### 3. Content Sections
- **Main Content** (2/3 width):
  - Overview details
  - Launch information
  - Use cases list
  - Team member cards
- **Media Section** (1/3 width):
  - Image gallery
  - Video showcase

## Components Used

- `Button` - For navigation tabs and actions
- `Card` - For team member display and media section
- `Separator` - For dividing sections
- `StarRating` - Custom component for displaying ratings
- `PlaceholderImage` - Custom component for image placeholders

## Responsive Design

The layout is fully responsive:
- On mobile: Single column layout
- On tablet: Adjusts spacing and grid columns
- On desktop: Multi-column layout with sidebar

## File Structure

```
src/
└── app/
    └── app/
        └── products/
            └── [id]/
                ├── page.tsx        # Product detail page
                └── layout.tsx      # Layout wrapper
```
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { RSS_SOURCE_LOGOS } from "@/lib/rss-service";
import { highlightImportantWords } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
}

export function NewsCard({ 
  title, 
  sourceName, 
  sourceUrl,
  publishedAt
}: NewsCardProps) {
  // Format the date and time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Get the appropriate logo for the source
  const getSourceLogo = (sourceId: string) => {
    // Check RSS source logos (exact match)
    if (RSS_SOURCE_LOGOS[sourceId]) {
      return RSS_SOURCE_LOGOS[sourceId];
    }
    
    // Try case-insensitive matching for RSS logos
    const rssLogoKey = Object.keys(RSS_SOURCE_LOGOS).find(
      key => key.toLowerCase() === sourceId.toLowerCase()
    );
    if (rssLogoKey) {
      return RSS_SOURCE_LOGOS[rssLogoKey];
    }
    
    // Fallback to default logo
    return RSS_SOURCE_LOGOS['default'] || "/globe.svg";
  };

  const handleRedirect = () => {
    window.open(sourceUrl, '_blank');
  };

  // Highlight important words in the title
  const highlightedTitle = highlightImportantWords(title);

  return (
    <div className="h-full flex flex-col">
      <h3 
        className="text-lg font-light mb-3 line-clamp-3 cursor-pointer hover:text-primary transition-colors min-h-[4.5rem]"
        onClick={handleRedirect}
      >
        <span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
      </h3>
      <div className="flex items-center justify-between mt-auto pt-4">
        <div className="flex items-center gap-1.5">
          <img 
            src={getSourceLogo(sourceName)} 
            alt={sourceName}
            className="w-4 h-4 rounded-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/globe.svg";
            }}
          />
          <span className="text-xs text-muted-foreground truncate max-w-[120px]">{sourceName}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDate(publishedAt)}
          </span>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 hover:bg-muted flex-shrink-0"
            onClick={handleRedirect}
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
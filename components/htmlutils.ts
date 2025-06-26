/**
 * Utility functions for HTML content handling
 */

/**
 * Decodes HTML entities in a string
 * @p          // Add the list item with proper formatting and dash prefix
          processedSection += `<li class="mb-2 flex"><span class="mr-2">-</span><span>${contentText}</span></li>\n`;
        } else {
          // If not a list item and we were in a list, close it
          if (inList) {
            processedSection += '</ul>\n';
            inList = false;
          }ring} html - The HTML string with entities
 * @returns {string} - Decoded HTML string
 */
export const decodeHtmlEntities = (html:any) => {
  if (!html) return '';
  const textArea = document.createElement('textarea');
  textArea.innerHTML = html;
  return textArea.value;
};

/**
 * Normalizes HTML tags to lowercase
 * @param {string} html - The HTML string with potentially uppercase tags
 * @returns {string} - HTML string with lowercase tags
 */
export const normalizeHtmlTags = (html:any) => {
  if (!html) return '';
  return html
    .replace(/<\/?H1>/gi, (tag:any) => tag.toLowerCase())
    .replace(/<\/?H2>/gi, (tag:any) => tag.toLowerCase())
    .replace(/<\/?H3>/gi, (tag:any) => tag.toLowerCase())
    .replace(/<\/?H4>/gi, (tag:any) => tag.toLowerCase())
    .replace(/<\/?H5>/gi, (tag:any) => tag.toLowerCase());
};

/**
 * Extracts a specific section from course description by heading
 * @param {string} description - The full HTML description
 * @param {string} sectionTitle - The title of the section to extract
 * @returns {string} - The extracted section content
 */
export const extractSection = (description:any, sectionTitles:any) => {
  if (!description) return '';

  const decodedDescription = decodeHtmlEntities(description);
  const normalizedDescription = normalizeHtmlTags(decodedDescription);

  // Join titles into a single regex group, allowing optional colons
  const titleGroup = sectionTitles.map((t:any) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`<h[12]>(?:<strong>)?(${titleGroup})(?::)?(?:</strong>)?</h[12]>\\s*([\\s\\S]*?)(?=<h[12]>|$)`, 'i');  

  const match = normalizedDescription.match(regex);

  return match ? match[2].trim() : '';
};
/**
 * Formats price with currency symbol
 * @param {number} price - The price value
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price:any, currency:any = 'EUR') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats course content sections to handle numbered lists and bullet points
 * @param {string} content - The content to format
 * @returns {string} - Formatted HTML content
 */
export const formatCourseContent = (content:any) => {
  if (!content) return '';  // First, clean up any existing line breaks for consistency
  let formattedContent = content.replace(/\r\n/g, '\n');
    // Handle "Day X: Title" headings first
  formattedContent = formattedContent.replace(/(Day \d+):\s*([^\n]+)/g, '<h3 class="font-semibold text-xl mt-5 mb-3">$1: $2</h3>');
  // Break up consecutive numbered items that are on the same line
  formattedContent = formattedContent.replace(/(\d+\.\s+[^0-9\n]+)(?=\d+\.)/g, '$1\n');
  
  // Convert any number followed by period to dash format (this will convert numbered lists to dash lists)
  formattedContent = formattedContent.replace(/(\d+)\.\s+/g, '- ');
  
  // Convert lines starting with dash to proper formatting
  formattedContent = formattedContent.replace(/^\s*-\s+(.+)$/gm, '- $1');
  
  // Handle main text sections that might contain numbered lists
  const sections = formattedContent.split(/(?=<h3)/);
  
  return sections.map((section:any) => {    // Process numbered lists within each section
    if (section.match(/(\d+\.\s+[^\n]+|^\s*-\s+[^\n]+)/gm)) {
      // If we detect a numbered list pattern or dash list pattern, process it
      const lines = section.split('\n');
      let inList = false;
      let processedSection = '';      lines.forEach((line :any)=> {
        // Check if this line is a numbered list item (like "1. Item")
        const numberedItemMatch = line.match(/^(\d+)\.\s+(.+)$/);
        // Check if this line is a dash list item (like "- Item")
        const dashItemMatch = line.match(/^\s*-\s+(.+)$/);
        
        if (numberedItemMatch || dashItemMatch) {
          if (!inList) {
            // Start a new list if we're not already in one
            processedSection += '<ul class="list-none mb-4 pl-5">\n';
            inList = true;
          }
          
          // Get the content text, either from numbered or dash format
          const contentText = numberedItemMatch ? numberedItemMatch[2] : dashItemMatch[1];
          
          // Add the list item with proper formatting and dash prefix
          processedSection += `<li class="mb-2 flex"><span class="mr-2">-</span><span>${contentText}</span></li>\n`;
        } else {
          // If not a list item and we were in a list, close it
          if (inList) {
            processedSection += '</ul>\n';
            inList = false;
          }
          
          // If it's not an HTML tag already, wrap in paragraph
          if (line.trim() && !line.trim().startsWith('<')) {
            processedSection += `<p class="mb-3">${line}</p>\n`;
          } else {
            processedSection += line + '\n';
          }
        }
      });
        // Close any open list
      if (inList) {
        processedSection += '</ul>\n';
      }
      
      return processedSection;
    } else {
      // If no numbered lists, just format paragraphs
      return section.split('\n')
        .filter((line:any) => line.trim())
        .map((line:any) => {
          if (!line.trim().startsWith('<')) {
            return `<p class="mb-3">${line}</p>`;
          }
          return line;
        })
        .join('\n');
    }
  }).join('');
};
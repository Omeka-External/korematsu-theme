<?php 
namespace OmekaTheme\Helper;

use Laminas\View\Helper\AbstractHelper;

class ResourceClassLayout extends AbstractHelper
{

    /**
     * Returns the Resource page layout.
     *
     * @param object $resource The resource to assign the layout to.
     * @return array
     */
    public function __invoke($resource)
    {
        if (!$resource) {
            return [];
        }

        $resourceClassLabel = $resource->displayResourceClassLabel();

        $view = $this->getView();

        $resourceClassLayouts = $view->themeSetting('resource_class_layouts');
        $resourceClassLayoutsArr = preg_split('/\r\n|\r|\n/', trim($resourceClassLayouts));

        $layout = [];

        foreach ($resourceClassLayoutsArr as $line) {
            $parts = explode('|', $line);

            if ($resourceClassLabel === trim($parts[0])) {
                array_shift($parts);
                $keys = ['left', 'center', 'right'];
                $i = 0;
                foreach ($parts as $part) {
                    $layout[$keys[$i]] = (int) $part;
                    $i++;
                }
                return $layout;
            }
        }

        return [];
    }
}

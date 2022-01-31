<?php
$barcode = filter_input(INPUT_POST, 'barcode');
$ticket = uniqid();

// Language detection 
if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])){
  $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
  $supportedLanguages=['en','de', 'fr', 'es', 'nl'];
    if(!in_array($lang,$supportedLanguages)){
       $lang = "en";
  }
}
else {
  $lang = "en";
}

require_once("localization/".$lang.".php");

// Open Issue on GitHub when error occurs
$openissue = '<a href="https://github.com/JokeNetwork/vegancheck.me/issues/new?assignees=philipbrembeck&labels=bug&body='.urlencode('Error ticket #'.$ticket.' (Please always include this number!) - Please describe your issue:').'" target="_blank" class="btn-dark">'.$langArray['results']['reporterror'].'</a>';

// Barcode is empty
if (empty($barcode) || $barcode == null){
  print_r('<span class="animated fadeIn"><div class="resultborder">'.$langArray['results']['invalid'].'<br>'.$openissue.'</div></span>');
}

// Barcode is not empty
else {
  $url = 'https://world.openfoodfacts.org/api/v0/product/'.$barcode;
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $data = curl_exec($curl);
  curl_close($curl);
  $product = json_decode($data);

  $beautyurl = 'https://world.openbeautyfacts.org/api/v0/product/'.$barcode;
  $curl = curl_init($beautyurl);
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $beautydata = curl_exec($curl);
  curl_close($curl);
  $beautyproduct = json_decode($beautydata);

  // When to use OpenBeautyFacts & when to use OpenFoodFacts
  if(empty($product->product) && !empty($beautyproduct->product)) {
    $api = 'https://world.openbeautyfacts.org/api/v0/product/';
    $baseuri = "https://world.openbeautyfacts.org";
    $apiname = 'OpenBeautyFacts';
  }
  elseif(!empty($product->product) && empty($beautyproduct->product)) {
    $api = 'https://world.openfoodfacts.org/api/v0/product/';
    $baseuri = "https://world.openfoodfacts.org";
    $apiname = 'OpenFoodFacts';
  }
  else {
    $api = 'https://world.openfoodfacts.org/api/v0/product/';
    $baseuri = "https://world.openfoodfacts.org";
    $apiname = 'OpenFoodFacts';
  }
  $url = $api.$barcode;
  $curl = curl_init($url);
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  $data = curl_exec($curl);
  curl_close($curl);
  $product = json_decode($data);

  // Start JSON array request
  if (!empty($product->product)) {
    $array = $product->product->ingredients_analysis_tags;
    $name = $product->product->product_name;
    $genericname = $product->product->generic_name; 
    $response = $product->status_verbose;
    $nutriscore = $product->product->nutriscore_grade;

    // Check for non-animal-tested products
    if($apiname == "OpenBeautyFacts"){
      if(isset($product->product->labels_tags)){
        if(in_array("en:not-tested-on-animals", $product->product->labels_tags) || in_array("de:ohne-tierversuche", $product->product->labels_tags) || in_array("en:cruelty-free", $product->product->labels_tags) || in_array("fr:cruelty-free", $product->product->labels_tags) || in_array("en:cruelty-free-international", $product->product->labels_tags) || in_array("en:vegan-society", $product->product->labels_tags)){
          $animaltestfree = '<span class="vegan"> '.$langArray['results']['animaltestfree'].'<span class="icon-ok"></span> </span>';
        }
        else {
          $animaltestfree = null;
        }
      }
      else {
        $animaltestfree = null;
      }
    }
    else {
      $animaltestfree = null;
    }

    // Check if $name is given or $genericname is given
    if(empty($name) && !empty($genericname)){
      $name = $genericname;
    }
    elseif(empty($genericname) && empty($name)){
      $name = $langArray['results']['unknown'];
    }

      // Set palmoil as unknown before checking it, to display "unknown" in case of no API response
      $palmoil = '<span class="unknown"> '.$langArray['results']['palmoilunknown'].'<span class="icon-help"></span> </span>';

      // Set vegetarian as unknown before checking it
      $vegetarian = '<span class="unknown">'.$langArray['results']['vegetarian'].'<span class="icon-help"></span> </span>';

      // Checks for the nutriscore
      if($nutriscore == "a"){
        $nutriscore = '<span class="nutri_a">Nutriscore A<span class="icon-ok"></span> </span>';
      }
      elseif($nutriscore == "b"){
        $nutriscore = '<span class="nutri_b">Nutriscore B<span class="icon-ok"></span> </span>';
      }
      elseif($nutriscore == "c"){
        $nutriscore = '<span class="nutri_c">Nutriscore C<span class="icon-ok"></span> </span>';
      }
      elseif($nutriscore == "d"){
        $nutriscore = '<span class="nutri_d">Nutriscore D<span class="icon-cancel"></span> </span>';
      }
      elseif($nutriscore == "e"){
        $nutriscore = '<span class="nutri_e">Nutriscore E<span class="icon-cancel"></span> </span>';
      }
      elseif($apiname == "OpenBeautyFacts"){
        $nutriscore = null;
      }
      else {
        $nutriscore = '<span class="unknown">Nutriscore '.$langArray['results']['unknown'].'<span class="icon-help"></span> </span>';
      }

    if(isset($array)){
      // Checks for the palm-oil status
      // Needs to be after isset($array) because it checks within the array 
      if (in_array("en:palm-oil", $array)) {
        $palmoil = '<span class="non-vegan"> '.$langArray['results']['containspalmoil'].'<span class="icon-cancel"></span> </span>';
      }
      elseif (in_array("en:palm-oil-free", $array)) {
        $palmoil = '<span class="vegan"> '.$langArray['results']['nopalmoil'].'<span class="icon-ok"></span> </span>';
      }
      else {
        $palmoil = '<span class="unknown"> '.$langArray['results']['palmoilunknown'].'<span class="icon-help"></span> </span>';
      }

      // Checks for the vegetarian status  
      if (in_array("en:non-vegetarian", $array)) {
        $vegetarian = '<span class="non-vegan">'.$langArray['results']['notvegetarian'].'<span class="icon-cancel"></span> </span>';
      }
      elseif (in_array("en:vegetarian", $array)) {
        $vegetarian = '<span class="vegan">'.$langArray['results']['vegetarian'].'<span class="icon-ok"></span> </span>';
      }
      else {
        $vegetarian = '<span class="unknown">'.$langArray['results']['vegetarian'].'<span class="icon-help"></span> </span>';
      }

        // if not vegan
        if (in_array("en:non-vegan", $array)) {
             print_r('<div class="animated fadeIn">
                    <div class="resultborder">
                      <span class="non-vegan">  
                        <span class="name">"'.$name.'":</span>
                      </span>
                      <span class="non-vegan">'.$langArray['results']['notvegan'].'<span class="icon-cancel"></span></span>'.$vegetarian.$animaltestfree.$palmoil.$nutriscore.'
                      <span class="source">Data source: <a href="'.$baseuri.'">'.$apiname.'</a></span>
                      <a href="https://twitter.com/intent/tweet?url=https://vegancheck.me&text='.urlencode($name).$langArray['results']['tweettext'].'" class="btn-dark" id="tweet"><span class="icon-twitter"></span> Tweet</a>
                      <a href="'.$baseuri.'/cgi/product.pl?type=edit&code='.$barcode.'" class="btn-dark"><span class="icon-pencil"></span> '.$langArray['results']['edit'].'</a>
                    </div>
                  </div>');
        }
        // if vegan status unknown
        elseif (in_array("en:vegan-status-unknown", $array) || in_array("en:maybe-vegan", $array)) {
            print_r('<div class="animated fadeIn">
                    <div class="resultborder">
                      <span class="unknown">
                        <span class="name">"'.$name.'":</span>
                      </span>
                      <span class="unknown">'.$langArray['results']['vegan'].'<span class="icon-help"></span> </span>'.$vegetarian.$animaltestfree.$palmoil.$nutriscore.'
                      <span class="source">Data source: <a href="'.$baseuri.'">'.$apiname.'</a></span>
                      <a href="'.$baseuri.'/cgi/product.pl?type=edit&code='.$barcode.'" class="btn-dark"><span class="icon-pencil"></span> '.$langArray['results']['edit'].'</a>
                    </div>
                  </div>');
        }
        // if vegan
        elseif (in_array("en:vegan", $array)) {
          print_r('<div class="animated fadeIn">
                  <div class="resultborder">
                    <span class="vegan">
                      <span class="name">"'.$name.'":</span>
                    </span>
                    <span class="vegan">'.$langArray['results']['vegan'].'<span class="icon-ok"></span> </span>'.$vegetarian.$animaltestfree.$palmoil.$nutriscore.'
                    <span class="source">Data source: <a href="'.$baseuri.'">'.$apiname.'</a></span>
                    <a href="https://twitter.com/intent/tweet?url=https://vegancheck.me&text='.urlencode($name).$langArray['results']['tweettextvegan'].'" class="btn-dark" id="tweet"><span class="icon-twitter"></span> Tweet</a>
                    <a href="'.$baseuri.'/cgi/product.pl?type=edit&code='.$barcode.'" class="btn-dark"><span class="icon-pencil"></span> '.$langArray['results']['edit'].'</a>
                  </div>
                </div>');
        }
        elseif ($response == "no code or invalid code"){
          print_r('<div class="animated fadeIn"><div class="resultborder"><span class="missing">'.$langArray['results']['invalidscan'].'</span><br>'.$openissue.'</div></div>');
        }
        // Product is not in OFF/OBF db
        else {
            print_r('<div class="animated fadeIn"><div class="resultborder"><span>'.$langArray['results']['notindb'].'</span><p class="missing">'.$langArray['results']['add'].' <a href="https://world.openfoodfacts.org/cgi/product.pl?code='.$barcode.'">'.$langArray['results']['addonoff'].'</a>.</p>
            '.$openissue.'</div></div>');
        }
    }
    // Fomer: $missinginfo, now: Name-output & nutriscore if available 
    else {
      print_r('<div class="animated fadeIn">
                    <div class="resultborder">
                      <span class="unknown">
                        <span class="name">"'.$name.'":</span>
                      </span>
                      <span class="unknown">'.$langArray['results']['vegan'].'<span class="icon-help"></span> </span>'.$vegetarian.$animaltestfree.$palmoil.$nutriscore.'
                      <span class="source">Data source: <a href="'.$baseuri.'">'.$apiname.'</a></span>
                      <a href="'.$baseuri.'/cgi/product.pl?type=edit&code='.$barcode.'" class="btn-dark"><span class="icon-pencil"></span> '.$langArray['results']['edit'].'</a> '.$openissue.'
                    </div>
                  </div>'); 
    }
  }
  // Use brocade API if item is not in OFF and use OEDBAPI if item is not in brocade
  else {
    $url = 'https://www.brocade.io/api/items/'.$barcode;
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $brocade = curl_exec($curl);
    curl_close($curl);
    $product = json_decode($brocade);
           if(!empty($product->name)){
             $productname = $product->name;
             $ingredients = $product->ingredients;
               if(!empty($productname) && !empty($ingredients)) {
                $apiname = 'Brocade.io';
                $baseuri = "https://brocade.io";
                $url = 'https://is-vegan.netlify.app/.netlify/functions/api?ingredients='.rawurlencode($ingredients);
                $curl = curl_init($url);
                curl_setopt($curl, CURLOPT_URL, $url);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                $isveganapi = curl_exec($curl);
                curl_close($curl);
                $isvegancheck = json_decode($isveganapi);
                if ($isvegancheck->isVeganSafe == "true"){
                  print_r('<div class="animated fadeIn">
                  <div class="resultborder">
                    <span class="vegan">
                      <span class="name">"'.$productname.'":</span>
                    </span>
                    <span class="vegan">'.$langArray['results']['vegan'].'<span class="icon-ok"></span> </span>
                    <span class="source">Data source: <a href="'.$baseuri.'">'.$apiname.'</a></span>
                    <a href="https://twitter.com/intent/tweet?url=https://vegancheck.me&text='.urlencode($productname).$langArray['results']['tweettextvegan'].'" class="btn-dark" id="tweet"><span class="icon-twitter"></span> Tweet</a>
                    <a href="'.$baseuri.'/cgi/product.pl?type=edit&code='.$barcode.'" class="btn-dark"><span class="icon-pencil"></span> '.$langArray['results']['edit'].'</a>
                  </div>
                </div>');
                }
                else {
                  $apiname = 'Brocade.io';
                  $baseuri = "https://brocade.io";
                  print_r('<div class="animated fadeIn">
                    <div class="resultborder">
                      <span class="unknown">
                        <span class="name">"'.$productname.'":</span>
                      </span>
                      <span class="unknown">'.$langArray['results']['vegan'].'<span class="icon-help"></span> </span>
                      '.$source.'
                      <a href="'.$baseuri.'/cgi/product.pl?type=edit&code='.$barcode.'" class="btn-dark"><span class="icon-pencil"></span> '.$langArray['results']['edit'].'</a>
                    </div>
                  </div>');
                }
               }
               else{
                $apiname = 'Brocade.io';
                $baseuri = "https://brocade.io";
                print_r('<div class="animated fadeIn"><div class="resultborder"><span><span class="name">"'.$productname.'":</span>'.$langArray['results']['notindb'].'</span><p class="missing">'.$langArray['results']['add'].' <a href="https://world.openfoodfacts.org/cgi/product.pl?code='.$barcode.'">'.$langArray['results']['addonoff'].'</a> '.$langArray['results']['or'].' <a href="https://world.openbeautyfacts.org/cgi/product.pl?code='.$barcode.'">'.$langArray['results']['addonobf'].'</a>.</p>
                <span class="source">Data source: <a href="'.$baseuri.'">'.$apiname.'</a></span>
        '.$openissue.'
        </div></div>');
        
               }
           }
           else {
            $url = 'https://opengtindb.org/?ean='.$barcode.'&cmd=query&queryid=400000000';
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            $oedb = curl_exec($curl);
            curl_close($curl);
            $array = parse_ini_string($oedb);
            $status = $array['error'];
            if ($status == "0"){
              $apiname = 'Open EAN Database';
              $baseuri = "https://opengtindb.org";
              $productname = utf8_encode($array['name'].' '.$array['detailname']);
              print_r('<div class="animated fadeIn"><div class="resultborder"><span><span class="name">"'.$productname.'":</span>'.$langArray['results']['notindb'].'</span><p class="missing">'.$langArray['results']['add'].' <a href="https://world.openfoodfacts.org/cgi/product.pl?code='.$barcode.'">'.$langArray['results']['addonoff'].'</a> '.$langArray['results']['or'].' <a href="https://world.openbeautyfacts.org/cgi/product.pl?code='.$barcode.'">'.$langArray['results']['addonobf'].'</a>.</p>
              <span class="source">Data source: <a href="'.$baseuri.'">'.$apiname.'</a></span>
        '.$openissue.'
        </div></div>');

            }
            else {
              print_r('<div class="animated fadeIn"><div class="resultborder"><span>'.$langArray['results']['notindb'].'</span><p class="missing">'.$langArray['results']['add'].' <a href="https://world.openfoodfacts.org/cgi/product.pl?code='.$barcode.'">'.$langArray['results']['addonoff'].'</a> '.$langArray['results']['or'].' <a href="https://world.openbeautyfacts.org/cgi/product.pl?code='.$barcode.'">'.$langArray['results']['addonobf'].'</a>.</p>
    '.$openissue.'
    </div></div>');
            }
           }
  }
}

// Remove before using on your own site
include_once("stats.php");
?>
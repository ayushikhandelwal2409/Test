steps:-
1. name(heading) =>meme template viewer
2. card for each meme containing picture and title
3. API to fetch=>https://api.imgflip.com/get_memes

4. Data flow in json file==>
in json data useful data is in data object which has memesin it   
then memes contain url and name in it
5. In start add search funtionality on title name


################################### what i have done? #######################################################
1. I have added React states using useState to keep track of the memes,search terms, load status, and errors.
2. When the app starts, useEffect runs once to fetch meme data from https://api.imgflip.com/get_memes
3. Before fetching, it sets loading to true and clears any previous errors.
4. Then it checks if the response is okay and whether the data returned is valid.
5. If everything’s fine, it saves the list of memes into the memes state.
6. If something goes wrong, it saves an error message in error.
7. In the end, it turns off the loading state.
8. I have added useMemo to get filteredMemes and converting the search term to lowercase and returning either the whole memes string or just those whose name includes the search text.
9. Then I created a header that includes a title and a search bar linked to the searchTerm state.
10. Below it, there’s a content section that changes depending on what’s happening — Each card displays the meme image using meme.url and the meme.name as its caption.

import * as Walk from 'walk';
import * as path from 'path';
import { Observable } from 'rxjs'

export class ArticleReader {

    public static list(folderPath: string): Observable<any> {
        return Observable.create(observer => {
            const walker = Walk.walk(folderPath);
    
            walker.on('file', (root, stats, next) => {
                if (/\.md/.test(stats.name)) {
                    observer.next({
                        root: root,
                        path: path.join(root, stats.name),
                        stats: stats
                    });
                }
                next();
            });

            walker.on('errors', (root, stats, next) => {
                observer.error(stats);
                next();
            });

            walker.on('end', () => {
                observer.complete();
            });
        });
    }
}